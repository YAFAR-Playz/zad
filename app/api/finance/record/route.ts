import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const record = await request.json();
  return NextResponse.json({ message: 'Finance record saved', record });
}
