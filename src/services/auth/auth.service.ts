import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { ReappException } from '@/errors/ReappException';
import { login } from './auth.requests';
import { LoginData, LoginResponse, SignUpRequest } from './auth.types';

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, ReappException | Error, LoginData>
) => {
  return useMutation({
    mutationFn: login,
    ...options,
  });
};
