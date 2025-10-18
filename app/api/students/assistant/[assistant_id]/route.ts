import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { assistant_id: string } }) {
  return NextResponse.json({
    message: 'Students by assistant',
    assistantId: params.assistant_id,
    students: [],
  });
}
