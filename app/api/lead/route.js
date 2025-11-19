import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase";

// Endpoint for persisting leads captured from the landing page.
// The API request is triggered by the <ButtonLead /> component
// Duplicate email submissions simply return 200 OK
export async function POST(req) {
  const supabase = createClient();

  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Custom logic can be implemented here
    // Examples: dispatching a welcome email (utilize the sendEmail helper from /libs/resend)
    // Examples: persisting the lead to the database (uncomment the code below)

    // Check if lead already exists
    // const { data: existingLead, error: fetchError } = await supabase
    //   .from('leads')
    //   .select('*')
    //   .eq('email', body.email)
    //   .single();

    // if (fetchError && fetchError.code !== 'PGRST116') {
    //   console.error('Error checking lead:', fetchError);
    //   throw fetchError;
    // }

    // if (!existingLead) {
    //   const { error: insertError } = await supabase
    //     .from('leads')
    //     .insert([{ email: body.email }]);

    //   if (insertError) {
    //     console.error('Error inserting lead:', insertError);
    //     throw insertError;
    //   }
    // }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
