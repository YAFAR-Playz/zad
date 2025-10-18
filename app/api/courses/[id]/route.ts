import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: 'Course detail', id: params.id });
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const updates = await request.json();
  return NextResponse.json({ message: 'Course updated', id: params.id, updates });
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({ message: 'Course deleted', id: params.id });
}
