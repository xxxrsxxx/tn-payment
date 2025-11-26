import { chargeService } from '@/services/charge.service';
import { ChargeData } from '@/type';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const chargeKeys = {
  all: ['charge'] as const,
  result: (id: string | undefined) =>
    [...chargeKeys.all, 'result', id] as const,
};

type UseGetChargeResultQueryOptions<
  TQueryFnData = ChargeData | null,
  TError = unknown,
  TData = ChargeData | null,
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData>,
  'queryKey' | 'queryFn' | 'enabled'
>;

export const useGetChargeResultQuery = (
  id: string | undefined,
  options?: UseGetChargeResultQueryOptions,
) => {
  return useQuery({
    queryKey: chargeKeys.result(id),
    queryFn: () => (id ? chargeService.getChargeResult(id) : null),
    enabled: !!id,
    ...options,
  });
};
