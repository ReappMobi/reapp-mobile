import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import api from '../api';
import {
  RESET_PASSWORD_KEY,
  SEND_EMAIL_KEY,
  SEND_RECOVERY_CODE_KEY,
} from './constants';
import {
  ResetPasswordRequest,
  ResetPasswordResponse,
  SendEmailRequest,
  SendEmailResponse,
  SendRecoveryCodeRequest,
  SendRecoveryCodeResponse,
} from './types';

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

export const useSendRecoveryCode = () => {
  const sendRecoveryCode = async (payload: SendRecoveryCodeRequest) => {
    const { data } = await api.post<SendRecoveryCodeResponse>(
      '/recover-password',
      payload
    );
    return data;
  };

  return useMutation({
    mutationKey: [SEND_RECOVERY_CODE_KEY],
    mutationFn: sendRecoveryCode,
  });
};

export const useResetPassword = () => {
  const resetPassword = async (payload: ResetPasswordRequest) => {
    const { data } = await api.post<ResetPasswordResponse>(
      'account/reset-password',
      payload
    );
    return data;
  };

  return useMutation({
    mutationKey: [RESET_PASSWORD_KEY],
    mutationFn: resetPassword,
  });
};
