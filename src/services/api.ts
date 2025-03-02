import axios from 'axios';

import config from '../config';

// TODO: Test real cases to define the best timeout value
const MAX_TIMEOUT = 5 * 1000; // 5 seconds
const TIMEOUT_ERROR_MESSAGE = 'Erro ao conectar com o servidor';

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: MAX_TIMEOUT,
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
  validateStatus() {
    return true;
  },
});

export default api;
