import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import api from '../api';
import { SEND_EMAIL_KEY, SendEmailRequest, SendEmailResponse } from './types';

export const useSendEmail = (
  options?: UseMutationOptions<SendEmailResponse, unknown, SendEmailRequest>
) => {
  const sendEmail = async (payload: SendEmailRequest) => {
    const { data } = await api.post<SendEmailResponse>(
      '/recover-password/send-email',
      payload
    );
    return data;
  };

  return useMutation({
    mutationKey: [SEND_EMAIL_KEY],
    mutationFn: sendEmail,
    ...options,
  });
};
