import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  const assistant = await request.json();
  const client = createSupabaseServerClient();

  await client.from('usage_logs').insert({
    module: 'assistants',
    action: 'create',
    payload: assistant,
  });

  return NextResponse.json({ message: 'Assistant created', assistant });
}
