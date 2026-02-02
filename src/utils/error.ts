import axios from 'axios';

export interface ReappBackendErrorResponse {
  code: string;
  message: string;
  data?: Record<string, unknown>;
}

export const getReappBackendError = (
  error: unknown
): ReappBackendErrorResponse | null => {
  if (axios.isAxiosError(error) && error.response?.data) {
    const backendData = error.response?.data as
      | ReappBackendErrorResponse
      | undefined;
    if (
      typeof backendData === 'object' &&
      backendData !== null &&
      'code' in backendData &&
      'message' in backendData
    ) {
      return backendData;
    }
  }
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error
  ) {
    return error as ReappBackendErrorResponse;
  }

  return null;
};
