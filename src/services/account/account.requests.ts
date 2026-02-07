import { IInstitution } from '@/types';
import { buildFormData } from '@/utils/form-data';
import api from '../api';
import {
  CreateAccountData,
  CreateAccountResponse,
  DeleteAccountData,
  DeleteAccountResponse,
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

export const createAccount = async (payload: CreateAccountData) => {
  const formData = buildFormData(payload as unknown as Record<string, unknown>);
  const { data } = await api.postForm<CreateAccountResponse>(
    '/account',
    formData
  );
  return data;
};

export const updateAccount = async ({
  id,
  ...payload
}: UpdateAccountData & { id: number }) => {
  const formData = buildFormData(payload as unknown as Record<string, unknown>);
  const { data } = await api.putForm<UpdateAccountResponse>(
    `/account/${id}`,
    formData
  );
  return data;
};

export const sendRecoveryEmail = async (payload: SendRecoveryEmailData) => {
  const { data } = await api.post<SendRecoveryEmailResponse>(
    'password-recovery/send-email',
    payload
  );
  return data;
};

export const recoveryPassword = async (payload: RecoveryPasswordData) => {
  const { data } = await api.post<RecoveryPasswordResponse>(
    'password-recovery',
    payload
  );
  return data;
};

export const resetPassword = async (payload: ResetPasswordData) => {
  const { data } = await api.post<ResetPasswordResponse>(
    'account/reset-password',
    payload
  );

  return data;
};

export const followAccount = async (id: number) => {
  const { data } = await api.post<FollowAccountResponse>(
    `/account/follow/${id}`,
    {}
  );
  return data;
};

export const unfollowAccount = async (id: number) => {
  const { data } = await api.delete<FollowAccountResponse>(
    `/account/unfollow/${id}`
  );
  return data;
};

export const getInstitutions = async () => {
  const { data } = await api.get<GetInstitutionsResponse>(
    '/account/institution'
  );
  return data;
};

export const deleteAccount = async ({
  accountId,
  token,
}: DeleteAccountData) => {
  const { data } = await api.delete<DeleteAccountResponse>(
    `/account/${accountId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
