import api from '../api';
import type { LoginData, LoginResponse, SignUpRequest } from './auth.types';

export const login = async (payload: LoginData) => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};

export const signUp = async ({ media, ...payload }: SignUpRequest) => {
  const formData = new FormData();

  for (const key in payload) {
    if ((payload as any)[key]) {
      formData.append(key, (payload as any)[key]);
    }
  }

  if (media) {
    formData.append('media', media as any);
  }

  const { data } = await api.post<LoginResponse>('/account', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
