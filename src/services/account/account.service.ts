import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import {
  createAccount,
  followAccount,
  getInstitutions,
  recoveryPassword,
  resetPassword,
  sendRecoveryEmail,
  unfollowAccount,
} from './account.requests';
import type {
  CreateAccountData,
  CreateAccountResponse,
  FollowAccountResponse,
  GetInstitutionsResponse,
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

export function useFollowAccount(
  options?: UseMutationOptions<FollowAccountResponse, Error, number>
) {
  return useMutation({
    mutationFn: followAccount,
    ...options,
  });
}

export function useUnfollowAccount(
  options?: UseMutationOptions<FollowAccountResponse, Error, number>
) {
  return useMutation({
    mutationFn: unfollowAccount,
    ...options,
  });
}

export function useGetInstitutions(
  options?: UseQueryOptions<GetInstitutionsResponse, Error>
) {
  return useQuery({
    queryKey: ['institutions'],
    queryFn: getInstitutions,
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
