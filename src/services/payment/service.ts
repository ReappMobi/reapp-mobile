import { useMutation } from '@tanstack/react-query';
import { requestPaymentUrl } from './requests';

export const useRequestPaymentUrl = () => {
  return useMutation({
    mutationFn: requestPaymentUrl,
  });
};
