import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { assistant_id: string; month: string } }) {
  return NextResponse.json({
    message: 'Salary slip',
    assistantId: params.assistant_id,
    month: params.month,
    url: null,
  });
}
