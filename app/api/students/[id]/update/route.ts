import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseClient';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const updates = await request.json();
  const client = createSupabaseServerClient();

  await client.from('usage_logs').insert({
    module: 'students',
    action: 'update_status',
    payload: { id: params.id, ...updates },
  });

  return NextResponse.json({ message: 'Student status updated', id: params.id });
}
