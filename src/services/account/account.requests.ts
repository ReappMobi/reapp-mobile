import { buildFormData } from '@/utils/form-data';
import api from '../api';
import {
  CreateAccountData,
  CreateAccountResponse,
  RecoveryPasswordData,
  RecoveryPasswordResponse,
  ResetPasswordData,
  ResetPasswordResponse,
  SendRecoveryEmailData,
  SendRecoveryEmailResponse,
} from './account.types';

export const createAccount = async (payload: CreateAccountData) => {
  const formData = buildFormData(payload as unknown as Record<string, unknown>);
  const { data } = await api.postForm<CreateAccountResponse>(
    '/account',
    formData
  );
  return data;
};

export const sendRecoveryEmail = async (payload: SendRecoveryEmailData) => {
  const { data, status } = await api.post<SendRecoveryEmailResponse>(
    'password-recovery/send-email',
    payload
  );

  if (status !== 200 && status !== 201 && status !== 204) {
    throw new Error(data.message || 'Erro ao enviar email de recuperação');
  }

  return data;
};

export const recoveryPassword = async (payload: RecoveryPasswordData) => {
  const { data, status } = await api.post<RecoveryPasswordResponse>(
    'password-recovery',
    payload
  );

  if (status !== 200 && status !== 201 && status !== 204) {
    throw new Error(data.message || 'Erro ao recuperar senha');
  }

  return data;
};

export const resetPassword = async (payload: ResetPasswordData) => {
  const { data, status } = await api.post<ResetPasswordResponse>(
    'account/reset-password',
    payload
  );

  if (status !== 200 && status !== 201 && status !== 204) {
    throw new Error(data.message || 'Erro ao redefinir senha');
  }

  return data;
};
