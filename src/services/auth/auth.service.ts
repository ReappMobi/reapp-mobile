import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ReappException } from '@/errors/ReappException';
import { login, signUp } from './auth.requests';
import { LoginData, LoginResponse, SignUpRequest } from './auth.types';

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ReappException | Error, LoginData>
) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};

export const useSignUp = (
  options?: UseMutationOptions<
    LoginResponse,
    ReappException | Error,
    SignUpRequest
  >
) => {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
};
