import api from '../api';
import type { LoginData, LoginResponse, SignUpRequest } from './auth.types';

export const login = async (payload: LoginData) => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
};
