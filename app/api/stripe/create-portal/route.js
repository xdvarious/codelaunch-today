import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import { createClient } from "@/libs/supabase";
import { createCustomerPortal } from "@/libs/stripe";

export async function POST(req) {
  const session = await auth();

  if (session) {
    try {
      const supabase = createClient();

      const body = await req.json();

      const { id } = session.user;

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching user:', error);
        throw error;
      }

      if (!user?.customer_id) {
        return NextResponse.json(
          {
            error:
              "You don't have a billing account yet. Make a purchase first.",
          },
          { status: 400 }
        );
      } else if (!body.returnUrl) {
        return NextResponse.json(
          { error: "Return URL is required" },
          { status: 400 }
        );
      }

      const stripePortalUrl = await createCustomerPortal({
        customerId: user.customer_id,
        returnUrl: body.returnUrl,
      });

      return NextResponse.json({
        url: stripePortalUrl,
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: e?.message }, { status: 500 });
    }
  } else {
    // User not authenticated
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }
}
