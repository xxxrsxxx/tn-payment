'use client';
import { PropsWithChildren, useState } from 'react';

import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// HydrationBoundary, DehydratedState 추가

export default function Providers({
  children,
  dehydratedState,
}: PropsWithChildren<{ dehydratedState?: DehydratedState }>) {
  // dehydratedState prop 추가
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // QueryClientManagement (Singleton vs Request-Scoped) 규칙에 따라
            // 클라이언트에서는 서버에서 가져온 데이터를 사용하고, 갱신 주기를 제어합니다.
            // re-fetch on mount, window focus, reconnect 등을 필요에 따라 설정합니다.
            staleTime: 5 * 1000, // 5초 동안 fresh 상태 유지 (예시)
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
