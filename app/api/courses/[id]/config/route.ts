import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: 'Course config', id: params.id, config: {} });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const config = await request.json();
  return NextResponse.json({ message: 'Course config updated', id: params.id, config });
}
