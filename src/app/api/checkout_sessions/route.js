import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { PLAN_PRICE_ID, stripe } from "../../../lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const planId = formData.get("plan_id");
    const priceId = PLAN_PRICE_ID[planId];
    console.log('first fghjkhrgefwdsfghjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    console.log(planId, priceId);
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        planId,
        priceId,
        userId: user?.id,
      },
      mode: "subscription",
      success_url: `${origin}/plan/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
