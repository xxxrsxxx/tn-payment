import { redirect } from 'next/navigation';

import { chargeService } from '@/services/charge.service';
import { ChargeData } from '@/type';
import { render, screen } from '@testing-library/react';

import CompletePage from './page';

// Mock dependencies
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('@/services/charge.service', () => ({
  chargeService: {
    getChargeResult: vi.fn(),
  },
}));

const mockedRedirect = vi.mocked(redirect);
const mockedChargeService = vi.mocked(chargeService);

describe('CompletePage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe('리다이렉트 시나리오', () => {
    it('TC1.1: searchParams에 id가 없으면 / 로 리다이렉트해야 합니다.', async () => {
      const props = {
        searchParams: Promise.resolve({}),
      };
      // 컴포넌트가 Promise를 반환하므로 await으로 호출합니다.
      await CompletePage(props);
      expect(mockedRedirect).toHaveBeenCalledWith('/');
    });

    it('TC1.2: searchParams의 id가 문자열이 아니면 / 로 리다이렉트해야 합니다.', async () => {
      const props = {
        searchParams: Promise.resolve({ id: ['123', '456'] }),
      };
      await CompletePage(props);
      expect(mockedRedirect).toHaveBeenCalledWith('/');
    });
  });

  describe('데이터 조회 실패 시나리오', () => {
    it('TC2.1: chargeService.getChargeResult가 null을 반환하면 에러 메시지를 표시해야 합니다.', async () => {
      mockedChargeService.getChargeResult.mockResolvedValue(null);
      const props = {
        searchParams: Promise.resolve({ id: 'test-id' }),
      };

      // async 컴포넌트를 렌더링하기 위해 JSX를 await 합니다.
      render(await CompletePage(props));

      expect(
        screen.getByText('정보를 불러올 수 없습니다.'),
      ).toBeInTheDocument();
    });
  });

  describe('데이터 조회 성공 시나리오', () => {
    it('TC3.1: 성공적으로 충전 결과를 가져오면 페이지를 올바르게 렌더링해야 합니다.', async () => {
      const mockResult = {
        amount: 1000,
        totalAmount: 5000,
        id: 'test-id',
        method: 'naverpay',
        location: 'DOMESTIC',
        methodHistory: { DOMESTIC: ['naverpay'], INTERNATIONAL: [] },
        date: '2025-11-26',
        status: 'SUCCESS',
      } as ChargeData;
      mockedChargeService.getChargeResult.mockResolvedValue(mockResult);

      const props = {
        searchParams: Promise.resolve({ id: 'test-id' }),
      };

      render(await CompletePage(props));

      expect(
        screen.getByRole('heading', { name: '충전 결과' }),
      ).toBeInTheDocument();
      expect(screen.getByText('충전 캐시')).toBeInTheDocument();
      expect(screen.getByText('1,000캐시')).toBeInTheDocument();
      expect(screen.getByText('보유 캐시 잔액')).toBeInTheDocument();
      expect(screen.getByText('5,000캐시')).toBeInTheDocument();

      const link = screen.getByRole('link', { name: '확인' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/');
    });
  });
});
