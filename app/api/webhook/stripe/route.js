import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@/libs/supabase";
import configFile from "@/config";
import { findCheckoutSession } from "@/libs/stripe";

// Initialize Stripe instance only when the secret key is present
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Endpoint for receiving Stripe webhook events
// Handles user data updates, email notifications, etc.
// By default, user information is persisted to the database
// Additional details: https://docs.codelaunch.today/features/payments
export async function POST(req) {
  // Verify Stripe configuration
  if (!stripe || !webhookSecret) {
    console.error("Stripe is not configured properly. Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Stripe configuration missing" }, { status: 500 });
  }

  const supabase = createClient();

  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  let data;
  let eventType;
  let event;

  // verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        // Initial payment successful and subscription established (when mode is set to "subscription" in ButtonCheckout)
        // ✅ Provide access to the product

        const session = await findCheckoutSession(data.object.id);

        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = data.object.client_reference_id;
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

        if (!plan) break;

        const customer = await stripe.customers.retrieve(customerId);

        let user;

        // Retrieve or create the user. The userId is typically passed in the checkout session (clientReferenceID) to identify users during webhook events
        if (userId) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user:', error);
            throw error;
          }

          user = userData;
        } else if (customer.email) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', customer.email)
            .single();

          if (error && error.code !== 'PGRST116') {
            console.error('Error fetching user:', error);
            throw error;
          }

          if (!userData) {
            // Create new user
            const { data: newUser, error: createError } = await supabase
              .from('users')
              .insert([
                {
                  email: customer.email,
                  name: customer.name,
                }
              ])
              .select()
              .single();

            if (createError) {
              console.error('Error creating user:', createError);
              throw createError;
            }

            user = newUser;
          } else {
            user = userData;
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        // Modify user data and grant product access. Stored as a boolean in the database, though it could represent credits or other metrics
        const { error: updateError } = await supabase
          .from('users')
          .update({
            price_id: priceId,
            customer_id: customerId,
            has_access: true,
          })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating user:', updateError);
          throw updateError;
        }

        // Optional: dispatch email with user link, product details, etc.
        // try {
        //   await sendEmail({to: ...});
        // } catch (e) {
        //   console.error("Email issue:" + e?.message);
        // }

        break;
      }

      case "checkout.session.expired": {
        // User abandoned the transaction
        // No action required here, though you could send a reminder email to prompt transaction completion
        break;
      }

      case "customer.subscription.updated": {
        // Customer may have modified their plan (upgrade, downgrade, scheduled cancellation, etc.)
        // No action needed here, as Stripe will notify us via the "customer.subscription.deleted" event when the subscription ends permanently (at billing cycle conclusion)
        // Consider updating user data to display a "Cancellation pending" indicator
        break;
      }

      case "customer.subscription.deleted": {
        // Customer subscription has terminated
        // ❌ Revoke product access
        // Customer may have altered their plan (upgrade, downgrade, scheduled cancellation, etc.)
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id
        );

        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('customer_id', subscription.customer)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          throw error;
        }

        // Remove product access
        const { error: updateError } = await supabase
          .from('users')
          .update({ has_access: false })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating user:', updateError);
          throw updateError;
        }

        break;
      }

      case "invoice.paid": {
        // Customer has settled an invoice (e.g., recurring subscription payment)
        // ✅ Provide product access
        const priceId = data.object.lines.data[0].price.id;
        const customerId = data.object.customer;

        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('customer_id', customerId)
          .single();

        if (error) {
          console.error('Error fetching user:', error);
          throw error;
        }

        // Verify the invoice corresponds to the user's subscribed plan (priceId)
        if (user.price_id !== priceId) break;

        // Authorize user access to your product. Represented as a boolean in the database, though could be credits or other values
        const { error: updateError } = await supabase
          .from('users')
          .update({ has_access: true })
          .eq('id', user.id);

        if (updateError) {
          console.error('Error updating user:', updateError);
          throw updateError;
        }

        break;
      }

      case "invoice.payment_failed":
        // Payment attempt unsuccessful (e.g., invalid payment method)
        // ❌ Revoke product access
        // ⏳ OR allow time for customer payment (more user-friendly approach):
        //      - Stripe automatically sends reminder emails (Smart Retries)
        //      - A "customer.subscription.deleted" event will be received after all retry attempts fail and subscription expires

        break;

      default:
      // Unhandled event type
    }
  } catch (e) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
