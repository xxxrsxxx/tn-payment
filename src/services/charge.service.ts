import { ChargeData } from '@/type';

import { getRequest } from '@/lib/fetch';

export const chargeService = {
  /**
   * @description 충전 결제 결과 조회
   * @param id 트랜잭션 또는 주문 ID
   */
  async getChargeResult(id: string): Promise<ChargeData | null> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    const endpoint = `${baseUrl}/api/charge/${id}`;

    return getRequest<ChargeData>(endpoint, {
      cache: 'no-store',
    });
  },
};
