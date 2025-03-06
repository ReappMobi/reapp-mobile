import api from './api';

interface RecoveryEmailResponse {
  message: string;
  token: string;
}

export const sendRecoveryEmail = async (
  email: string
): Promise<RecoveryEmailResponse> => {
  const response = await api.get(`/password-recovery/send-email`, {
    params: { email },
  });
  if (response.data.statusCode) {
    throw new Error(response.data?.message || 'Erro ao enviar email.');
  }
  return response.data;
};

export const recoveryPassword = async (token: string, code: string) => {
  const response = await api.get('/password-recovery', {
    params: { token, code },
  });
  if (response.data.statusCode) {
    throw new Error(response.data?.message || 'Erro ao verificar código.');
  }
  return response.data;
};

export const resetPassword = async (
  token: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await api.post('/account/reset-password', {
    token,
    password,
    passwordConfirmation,
  });
  return response.data;
};
