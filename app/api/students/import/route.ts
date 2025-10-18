import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const client = createSupabaseServerClient();

  await client.from('usage_logs').insert({
    module: 'students',
    action: 'import',
    payload,
  });

  return NextResponse.json({ message: 'Students queued for import' });
}
