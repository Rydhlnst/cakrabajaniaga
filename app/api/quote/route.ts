import { NextResponse } from "next/server";

// Lightweight quote-request handler. Currently logs the lead server-side and
// returns success. Wire an email provider (Resend / Nodemailer) or CRM here to
// deliver leads to the export desk.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.fullName || !body?.email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    // TODO: forward to email/CRM. For now, log for visibility in dev.
    console.log("[quote] new request:", {
      fullName: body.fullName,
      company: body.company,
      country: body.country,
      email: body.email,
      product: body.product,
      quantity: body.quantity,
      message: body.message,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
