import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getReappBackendError } from '@/utils/error';

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

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@RNAuth:token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const transformedError = getReappBackendError(error);
    return Promise.reject(transformedError);
  }
);

export default api;
