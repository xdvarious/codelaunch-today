import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";

// Endpoint for persisting leads captured from the landing page.
// The API request is triggered by the <ButtonLead /> component
// Duplicate email submissions simply return 200 OK
export async function POST(req) {
  await connectMongo();

  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    // Custom logic can be implemented here
    // Examples: dispatching a welcome email (utilize the sendEmail helper from /libs/resend)
    // Examples: persisting the lead to the database (uncomment the code below)

    // const lead = await Lead.findOne({ email: body.email });

    // if (!lead) {
    // 	await Lead.create({ email: body.email });
    // }

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
