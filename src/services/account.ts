import api, { ApiError } from './api';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { Account } from '@/types/Account';

export type RequestMedia = {
  uri: string;
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
};

type UpdateAccountRequest = {
  name?: string;
  email?: string;
  note?: string;
  category?: string;
  fields?: Record<string, string>;
  password?: string;
  passwordConfirmation?: string;
  media?: RequestMedia | null;
};

type UpdateAccountParams = {
  accountId: number;
  token: string;
  payload: UpdateAccountRequest;
};

export const updateAccount = async ({
  token,
  accountId,
  payload,
}: UpdateAccountParams) => {
  const formData = new FormData();
  for (const key in payload) {
    if (payload[key]) {
      formData.append(key, payload[key]);
    }
  }

  const response = await api.putForm<Account | ApiError>(
    `/account/${accountId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    const { message } = response.data as ApiError;
    throw new ApiError(message || 'Erro ao atualizar perfil', response.status);
  }

  return response.data;
};

export const useUpdateAccount = (
  options?: UseMutationOptions<Account, ApiError, UpdateAccountParams, unknown>
) => {
  return useMutation({
    mutationFn: updateAccount,
    ...options,
  });
};
