import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { mockChargeDB } from '@/lib/mock-db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      amount,
      method,
      location,
      transactionId: existingTransactionId,
    } = body;
    const cookieStore = await cookies();
    const sessionTransactionId = cookieStore.get(
      'session_transactionId',
    )?.value;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const transactionId = sessionTransactionId
      ? sessionTransactionId
      : existingTransactionId;

    const isTransactionIdValid =
      transactionId && mockChargeDB.has(transactionId);

    if (isTransactionIdValid) {
      const existingData = mockChargeDB.get(transactionId);
      if (existingData) {
        const updatedData = {
          ...existingData,
          amount,
          method,
          location,
          methodHistory: {
            DOMESTIC: [
              ...new Set([
                ...(location === 'DOMESTIC' ? [method] : []),
                ...existingData.methodHistory.DOMESTIC,
              ]),
            ],
            INTERNATIONAL: location === 'INTERNATIONAL' ? [method] : [],
          },
          totalAmount: (existingData.totalAmount || 0) + amount,
          date: new Date().toISOString().split('T')[0],
        };
        mockChargeDB.set(transactionId, updatedData);
        return NextResponse.json({ transactionId });
      }
    }

    const newTransactionId = Date.now().toString();
    const chargeData = {
      id: newTransactionId,
      amount,
      method,
      location,
      methodHistory: {
        DOMESTIC: [],
        INTERNATIONAL: [],
        [location]: [method],
      },
      totalAmount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'SUCCESS',
    };
    mockChargeDB.set(newTransactionId, chargeData);

    cookieStore.set({
      name: 'session_transactionId',
      value: newTransactionId,
      httpOnly: true,
      path: '/',
      maxAge: 30 * 60,
    });

    return NextResponse.json({ transactionId: newTransactionId });
  } catch (error) {
    console.error('Charge API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
