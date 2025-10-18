import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Course list', courses: [] });
}

export async function POST(request: NextRequest) {
  const course = await request.json();
  return NextResponse.json({ message: 'Course created', course });
}
