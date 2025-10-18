import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const client = createSupabaseServerClient();
  const body = await request.json();

  await client.from('usage_logs').insert({
    module: 'assistants',
    action: 'remove',
    payload: { id: params.id, ...body },
  });

  return NextResponse.json({ message: 'Assistant removed', id: params.id });
}
