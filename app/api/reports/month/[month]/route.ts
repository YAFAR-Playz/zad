import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { month: string } }) {
  return NextResponse.json({ message: 'Reports by month', month: params.month, reports: [] });
}
