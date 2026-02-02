import axios from 'axios';

const MAX_TIMEOUT = 5 * 1000; // 5 seconds
const TIMEOUT_ERROR_MESSAGE = 'Erro ao conectar com o servidor';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'https://api.reapp.dev.br';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: MAX_TIMEOUT,
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
});

export default api;
