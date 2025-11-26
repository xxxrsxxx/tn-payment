import { NextResponse } from 'next/server';

import { mockChargeDB } from '@/lib/mock-db';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const data = mockChargeDB.get(id);
  if (!data) {
    return NextResponse.json(
      { error: '결제 정보를 찾을 수 없습니다.' },
      { status: 404 },
    );
  }

  return NextResponse.json(data);
}
