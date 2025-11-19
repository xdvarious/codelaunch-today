import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import { createCheckout } from "@/libs/stripe";
import { createClient } from "@/libs/supabase";

// Creates a Stripe Checkout Session (for single payments or subscriptions)
// Invoked by the <ButtonCheckout /> component
// Authentication is not mandatory by default. However, authenticated users will have their Checkout data auto-filled with email and/or payment information
export async function POST(req) {
  const body = await req.json();

  if (!body.priceId) {
    return NextResponse.json(
      { error: "Price ID is required" },
      { status: 400 }
    );
  } else if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json(
      { error: "Success and cancel URLs are required" },
      { status: 400 }
    );
  } else if (!body.mode) {
    return NextResponse.json(
      {
        error:
          "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
      },
      { status: 400 }
    );
  }

  try {
    const session = await auth();

    const supabase = createClient();

    let user = null;

    if (session?.user?.id) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user:', error);
        throw error;
      }

      user = data;
    }

    const { priceId, mode, successUrl, cancelUrl } = body;

    const stripeSessionURL = await createCheckout({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      // For authenticated users, passes the user ID to the Stripe Session for webhook retrieval
      clientReferenceId: user?.id?.toString(),
      // For authenticated users, auto-fills Checkout information such as email and/or payment details for expedited checkout
      user,
      // Coupon codes sent from the frontend can be included here
      // couponId: body.couponId,
    });

    return NextResponse.json({ url: stripeSessionURL });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
