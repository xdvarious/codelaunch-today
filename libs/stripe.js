import Stripe from "stripe";

// Creates a Stripe Checkout session for single payments. Typically activated via the <ButtonCheckout /> component. Webhook events handle database updates for user status.
export const createCheckout = async ({
  priceId,
  mode,
  successUrl,
  cancelUrl,
  couponId,
  clientReferenceId,
  user,
}) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const extraParams = {};

  if (user?.customerId) {
    extraParams.customer = user.customerId;
  } else {
    if (mode === "payment") {
      extraParams.customer_creation = "always";
      // Enabling this feature incurs a fee of 0.4% (capped at $2) per invoice. As an alternative, https://zenvoice.io/ offers automated unlimited invoice generation.
      // extraParams.invoice_creation = { enabled: true };
      extraParams.payment_intent_data = { setup_future_usage: "on_session" };
    }
    if (user?.email) {
      extraParams.customer_email = user.email;
    }
    extraParams.tax_id_collection = { enabled: true };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode,
    allow_promotion_codes: true,
    client_reference_id: clientReferenceId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    discounts: couponId
      ? [
          {
            coupon: couponId,
          },
        ]
      : [],
    success_url: successUrl,
    cancel_url: cancelUrl,
    ...extraParams,
  });

  return stripeSession.url;
};

// Generates Customer Portal sessions enabling users to manage their subscription details (payment methods, cancellations, etc.)
export const createCustomerPortal = async ({ customerId, returnUrl }) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return portalSession.url;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// Retrieves the user's checkout session and expands the data to extract the subscribed planId
export const findCheckoutSession = async (sessionId) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
};
