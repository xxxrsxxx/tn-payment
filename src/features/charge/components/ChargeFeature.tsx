'use client';

import { useEffect } from 'react';

import { ChargeForm } from '@/features/charge/components';
import { useGetChargeResultQuery } from '@/features/charge/queries/useGetChargeResultQuery';
import { useChargeStore } from '@/features/charge/stores/charge.store';

interface ChargeFeatureProps {
  transactionId?: string;
}

export default function ChargeFeature({ transactionId }: ChargeFeatureProps) {
  const initState = useChargeStore(state => state.initState);

  const { data: initialData, isSuccess } =
    useGetChargeResultQuery(transactionId);

  useEffect(() => {
    if (isSuccess && initialData) {
      initState({
        method: initialData.method,
        location: initialData.location,
        methodHistory: initialData.methodHistory,
      });
    }
  }, [isSuccess, initialData, initState]);

  return <ChargeForm />;
}
