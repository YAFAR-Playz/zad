import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const client = createSupabaseServerClient();

  await client.from('usage_logs').insert({
    module: 'auth',
    action: 'password_reset_request',
    payload: { email: body.email },
  });

  return NextResponse.json({ message: 'Reset email triggered' });
}
