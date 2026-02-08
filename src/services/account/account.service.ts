import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { ReappException } from '@/errors/ReappException';
import {
  createAccount,
  followAccount,
  getInstitutions,
  recoveryPassword,
  resetPassword,
  sendRecoveryEmail,
  unfollowAccount,
  updateAccount,
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
  UpdateAccountData,
  UpdateAccountResponse,
} from './account.types';

export const GET_INSTITUIONS_KEY = 'get-institutions';

export function useCreateAccount(
  options?: UseMutationOptions<
    CreateAccountResponse,
    ReappException | Error,
    CreateAccountData
  >
) {
  return useMutation({
    mutationFn: createAccount,
    ...options,
  });
}

export function useUpdateAccount(
  options?: UseMutationOptions<
    UpdateAccountResponse,
    ReappException | Error,
    UpdateAccountData & { id: number }
  >
) {
  return useMutation({
    mutationFn: updateAccount,
    ...options,
  });
}

export function useFollowAccount(
  options?: UseMutationOptions<
    FollowAccountResponse,
    ReappException | Error,
    number
  >
) {
  return useMutation({
    mutationFn: followAccount,
    ...options,
  });
}

export function useUnfollowAccount(
  options?: UseMutationOptions<
    FollowAccountResponse,
    ReappException | Error,
    number
  >
) {
  return useMutation({
    mutationFn: unfollowAccount,
    ...options,
  });
}

export function useGetInstitutions(
  options?: UseQueryOptions<GetInstitutionsResponse, ReappException | Error>
) {
  return useQuery({
    queryKey: [GET_INSTITUIONS_KEY],
    queryFn: getInstitutions,
    ...options,
  });
}

export function useResetPassword(
  options?: UseMutationOptions<
    ResetPasswordResponse,
    ReappException | Error,
    ResetPasswordData
  >
) {
  return useMutation({
    mutationFn: resetPassword,
    ...options,
  });
}

export function useRecoveryPassword(
  options?: UseMutationOptions<
    RecoveryPasswordResponse,
    ReappException | Error,
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
    ReappException | Error,
    SendRecoveryEmailData
  >
) {
  return useMutation({
    mutationFn: sendRecoveryEmail,
    ...options,
  });
}
