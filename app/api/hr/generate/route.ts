import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  return NextResponse.json({ message: 'HR generation queued', payload });
}
