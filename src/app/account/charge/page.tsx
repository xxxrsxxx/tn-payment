import { Suspense } from 'react';
import { cache } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { cookies } from 'next/headers';

import ChargeFeature from '@/features/charge/components/ChargeFeature';
import { chargeKeys } from '@/features/charge/queries/useGetChargeResultQuery';
import { chargeService } from '@/services/charge.service';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import ErrorFallback from '@/components/error/ErrorFallback';

const getQueryClient = cache(() => new QueryClient());

export default async function ChargePage() {
  const queryClient = getQueryClient();

  const cookieStore = await cookies();
  const transactionId = cookieStore.get('session_transactionId')?.value;

  await queryClient.prefetchQuery({
    queryKey: chargeKeys.result(transactionId!),
    queryFn: () =>
      transactionId ? chargeService.getChargeResult(transactionId) : null,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <main className="max_w_md flex w-full flex-col">
        <header className="tab-header">
          <h5 className="mb-4 text-3xl font-bold">충전 하기</h5>
        </header>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<div>Loading...</div>}>
            <HydrationBoundary state={dehydratedState}>
              <ChargeFeature transactionId={transactionId} />
            </HydrationBoundary>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
