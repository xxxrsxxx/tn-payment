import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { ChargeData } from '@/type';

import { mockChargeDB } from '@/lib/mock-db';

import { POST } from './route';

// Mocking next/headers
vi.mock('next/headers', () => ({
  cookies: vi.fn(),
}));

const mockedCookies = vi.mocked(cookies) as any;

describe('POST /api/charge', () => {
  beforeEach(() => {
    mockChargeDB.clear();
    mockedCookies.mockReturnValue({
      get: vi.fn().mockReturnValue(undefined),
      set: vi.fn(),
    } as any);
  });

  // 1. Invalid Requests
  describe('유효하지 않은 요청 (400)', () => {
    it('TC1.1: 금액이 누락된 경우 400을 반환해야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({ method: 'naverpay' }),
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe('Invalid amount');
    });

    it('TC1.2: 금액이 0이거나 음수인 경우 400을 반환해야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({ amount: -100, method: 'naverpay' }),
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(400);
      expect(body.error).toBe('Invalid amount');
    });

    it('TC1.3: 비-JSON 본문을 처리하고 500을 반환해야 합니다.', async () => {
      // Suppress console.error for this test case
      const consoleErrorSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: 'not-a-json',
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body.error).toBe('Internal Server Error');

      // Restore original console.error
      consoleErrorSpy.mockRestore();
    });
  });

  // 2. New Charge Creation
  describe('새로운 결제 생성', () => {
    it('TC2.1: ID가 제공되지 않은 경우 새 트랜잭션을 생성해야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: 1000,
          method: 'naverpay',
          location: 'DOMESTIC',
        }),
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.transactionId).toBeDefined();
      expect(mockChargeDB.has(body.transactionId)).toBe(true);

      const cookieArgs = mockedCookies().set.mock.calls[0][0];
      expect(cookieArgs.name).toBe('session_transactionId');
      expect(cookieArgs.value).toBe(body.transactionId);
    });

    it('TC2.2: 국내(DOMESTIC) 결제 위치에 대해 기록을 올바르게 초기화해야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: 1000,
          method: 'naverpay',
          location: 'DOMESTIC',
        }),
      });
      const response = await POST(request);
      const { transactionId } = await response.json();
      const data = mockChargeDB.get(transactionId) as ChargeData;

      expect(data.methodHistory.DOMESTIC).toEqual(['naverpay']);
      expect(data.methodHistory.INTERNATIONAL).toEqual([]);
    });

    it('TC2.3: 해외(INTERNATIONAL) 결제 위치에 대해 기록을 올바르게 초기화해야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: 5000,
          method: 'EX1',
          location: 'INTERNATIONAL',
        }),
      });
      const response = await POST(request);
      const { transactionId } = await response.json();
      const data = mockChargeDB.get(transactionId) as ChargeData;

      expect(data.methodHistory.INTERNATIONAL).toEqual(['EX1']);
      expect(data.methodHistory.DOMESTIC).toEqual([]);
    });
  });

  // 3. Existing Charge Update
  describe('기존 결제 업데이트', () => {
    let existingTxId: string;

    beforeEach(() => {
      existingTxId = Date.now().toString();
      mockChargeDB.set(existingTxId, {
        id: existingTxId,
        amount: 1000,
        totalAmount: 1000,
        method: 'naverpay',
        location: 'DOMESTIC',
        methodHistory: { DOMESTIC: ['naverpay'], INTERNATIONAL: [] },
        date: '2025-11-26',
        status: 'SUCCESS',
      });
    });

    it('TC3.1: 쿠키 세션을 통해 기존 트랜잭션을 업데이트해야 합니다.', async () => {
      mockedCookies.mockReturnValue({
        get: vi.fn().mockReturnValue({ value: existingTxId }),
        set: vi.fn(),
      } as any);

      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          amount: 500,
          method: 'kakaopay',
          location: 'DOMESTIC',
        }),
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.transactionId).toBe(existingTxId);

      const updatedData = mockChargeDB.get(existingTxId) as ChargeData;
      expect(updatedData.totalAmount).toBe(1500);
      expect(updatedData.amount).toBe(500);
      expect(updatedData.method).toBe('kakaopay');
    });

    it('TC3.2: 요청 본문을 통해 기존 트랜잭션을 업데이트해야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          transactionId: existingTxId,
          amount: 2000,
          method: 'kakopay',
          location: 'DOMESTIC',
        }),
      });

      const response = await POST(request);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body.transactionId).toBe(existingTxId);
      expect(mockChargeDB.get(existingTxId)?.totalAmount).toBe(3000);
    });

    it('TC3.3: 국내(DOMESTIC) 기록에 중복된 결제 수단을 추가해서는 안 됩니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          transactionId: existingTxId,
          amount: 100,
          method: 'naverpay', // Duplicate method
          location: 'DOMESTIC',
        }),
      });

      await POST(request);

      const updatedData = mockChargeDB.get(existingTxId) as ChargeData;
      expect(updatedData.methodHistory.DOMESTIC).toEqual(['naverpay']);
    });

    it('TC3.4: 결제 위치가 변경될 때 해외(INTERNATIONAL) 기록을 덮어써야 합니다.', async () => {
      const request = new NextRequest('http://localhost/api/charge', {
        method: 'POST',
        body: JSON.stringify({
          transactionId: existingTxId,
          amount: 100,
          method: 'EX1',
          location: 'INTERNATIONAL',
        }),
      });

      await POST(request);

      const updatedData = mockChargeDB.get(existingTxId) as ChargeData;
      expect(updatedData.methodHistory.INTERNATIONAL).toEqual(['EX1']);
      expect(updatedData.methodHistory.DOMESTIC).toEqual(['naverpay']);
    });
  });
});
