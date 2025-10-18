import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  const credentials = await request.json();
  const client = createSupabaseServerClient();

  await client.from('usage_logs').insert({
    module: 'auth',
    action: 'login_attempt',
    payload: { email: credentials.email },
  });

  return NextResponse.json({ message: 'Login attempt recorded' });
}
