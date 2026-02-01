import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  RecoveryPasswordData,
  RecoveryPasswordResponse,
  type ResetPasswordData,
  ResetPasswordResponse,
  recoveryPassword,
  resetPassword,
  type SendRecoveryEmailData,
  SendRecoveryEmailResponse,
  sendRecoveryEmail,
} from './account.requests';

export function useResetPassword(
  options?: UseMutationOptions<ResetPasswordResponse, Error, ResetPasswordData>
) {
  return useMutation({
    mutationFn: resetPassword,
    ...options,
  });
}

export function useRecoveryPassword(
  options?: UseMutationOptions<
    RecoveryPasswordResponse,
    Error,
    RecoveryPasswordData
  >
) {
  return useMutation({
    mutationFn: recoveryPassword,
    ...options,
  });
}

export function useSendRecoveryEmail(
  options?: UseMutationOptions<
    SendRecoveryEmailResponse,
    Error,
    SendRecoveryEmailData
  >
) {
  return useMutation({
    mutationFn: sendRecoveryEmail,
    ...options,
  });
}
