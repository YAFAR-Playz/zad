import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const payload = await request.text();

  // TODO: validate signature with Stripe SDK when keys are configured.
  console.info('Stripe webhook received', { signature, payload });

  return NextResponse.json({ received: true });
}
