import { NextRequest } from 'next/server';

import { ChargeData } from '@/type';

import { mockChargeDB } from '@/lib/mock-db';

import { GET } from './route';

describe('GET /api/charge/[id]', () => {
  beforeEach(() => {
    mockChargeDB.clear();
  });

  // 1. 결제 정보 조회 실패
  describe('결제 정보 조회 실패 (404)', () => {
    it('TC1.1: 존재하지 않는 ID로 조회 시 404 에러를 반환해야 합니다.', async () => {
      const nonExistentId = 'non-existent-id';
      const request = new NextRequest(
        `http://localhost/api/charge/${nonExistentId}`,
      );
      const context = { params: Promise.resolve({ id: nonExistentId }) };

      const response = await GET(request, context);
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error).toBe('결제 정보를 찾을 수 없습니다.');
    });
  });

  // 2. 결제 정보 조회 성공
  describe('결제 정보 조회 성공 (200)', () => {
    it('TC2.1: 존재하는 ID로 조회 시 해당 결제 정보를 반환해야 합니다.', async () => {
      const existingId = 'test-id-123';
      const mockData: ChargeData = {
        id: existingId,
        amount: 5000,
        totalAmount: 5000,
        method: 'naverpay',
        location: 'DOMESTIC',
        methodHistory: { DOMESTIC: ['naverpay'], INTERNATIONAL: [] },
        date: '2025-11-26',
        status: 'SUCCESS',
      };
      mockChargeDB.set(existingId, mockData);

      const request = new NextRequest(
        `http://localhost/api/charge/${existingId}`,
      );
      const context = { params: Promise.resolve({ id: existingId }) };

      const response = await GET(request, context);
      const body = await response.json();

      expect(response.status).toBe(200);
      expect(body).toEqual(mockData);
    });
  });
});
