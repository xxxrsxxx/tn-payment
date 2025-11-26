import { useRouter } from 'next/navigation';

import type { SubmitReqBody, SubmitResBody } from '@/type';
import { useMutation } from '@tanstack/react-query';

import { postRequest } from '@/lib/fetch';

export const useSubmitChargeMutation = () => {
  const router = useRouter();

  return useMutation<SubmitResBody, Error, SubmitReqBody>({
    mutationFn: ({ amount, location, method }) =>
      postRequest('/api/charge', { amount, location, method }),
    onSuccess: data => {
      if (data.transactionId) {
        router.push(`/account/complete?id=${data.transactionId}`);
      }
    },
    // onError, onSettled 등 추가적인 핸들링 가능
  });
};
