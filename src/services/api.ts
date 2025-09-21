import axios from 'axios';

const MAX_TIMEOUT = 5 * 1000; // 5 seconds
const TIMEOUT_ERROR_MESSAGE = 'Erro ao conectar com o servidor';

export class ApiError extends Error {
  status?: number;
  message: string;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: MAX_TIMEOUT,
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
  validateStatus() {
    return true;
  },
  withCredentials: true,
});

export default api;
