import axios from 'axios';
import { ReappException } from '@/errors/ReappException';
import { BackendErrorCodes } from '@/types/errors';

export interface ReappBackendErrorResponse {
  code: BackendErrorCodes;
  message: string;
  data?: Record<string, unknown>;
}

export const getReappBackendError = (
  error: unknown
): ReappException | Error => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const backendData = error.response?.data as
        | ReappBackendErrorResponse
        | undefined;

      if (
        typeof backendData === 'object' &&
        backendData !== null &&
        'code' in backendData &&
        'message' in backendData
      ) {
        return new ReappException(
          backendData.code,
          backendData.message,
          error.response.status,
          backendData.data
        );
      }
    }

    return new Error(error.message || 'Erro de conexão com o servidor');
  }

  if (error instanceof ReappException) {
    return error;
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error('Ocorreu um erro inesperado');
};
