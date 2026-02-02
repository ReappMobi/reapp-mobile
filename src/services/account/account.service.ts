import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import {
  createAccount,
  recoveryPassword,
  resetPassword,
  sendRecoveryEmail,
} from './account.requests';
import type {
  CreateAccountData,
  CreateAccountResponse,
  RecoveryPasswordData,
  RecoveryPasswordResponse,
  ResetPasswordData,
  ResetPasswordResponse,
  SendRecoveryEmailData,
  SendRecoveryEmailResponse,
} from './account.types';

export function useCreateAccount(
  options?: UseMutationOptions<CreateAccountResponse, Error, CreateAccountData>
) {
  return useMutation({
    mutationFn: createAccount,
    ...options,
  });
}

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
