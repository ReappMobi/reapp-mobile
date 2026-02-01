import api from '../api';

export interface SendRecoveryEmailData {
  email: string;
}
export interface SendRecoveryEmailResponse {
  message: string;
  token: string;
}

export interface RecoveryPasswordData {
  token: string;
  code: string;
}
export interface RecoveryPasswordResponse {
  message: string;
  token: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  passwordConfirmation: string;
}
export interface ResetPasswordResponse {
  message: string;
}

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
