import Link from 'next/link';
import { redirect } from 'next/navigation';

import { chargeService } from '@/services/charge.service';

import { Button } from '@/components/ui';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CompletePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const id = resolvedSearchParams?.id;

  if (!id || typeof id !== 'string') {
    redirect('/');
  }

  const result = await chargeService.getChargeResult(id);

  if (!result) {
    return <div>정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="mb-4 text-2xl font-bold">충전 결과</h2>

      <div className="mb-6 w-full max-w-sm rounded-lg bg-gray-50 p-6">
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">충전 캐시</span>
          <span className="font-bold text-blue-600">
            {result.amount.toLocaleString()}캐시
          </span>
        </div>
        <div className="mb-2 flex justify-between">
          <span className="text-gray-600">보유 캐시 잔액</span>
          <span className="font-bold">
            {result.totalAmount.toLocaleString()}캐시
          </span>
        </div>
      </div>

      <Link href="/">
        <Button.Round variant="primary" size="lg">
          확인
        </Button.Round>
      </Link>
    </div>
  );
}
