import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MAX_TIMEOUT = 10 * 1000; // 10 seconds
const TIMEOUT_ERROR_MESSAGE = 'Erro ao conectar com o servidor';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'https://api.reapp.dev.br';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: MAX_TIMEOUT,
  timeoutErrorMessage: TIMEOUT_ERROR_MESSAGE,
  validateStatus() {
    return true;
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@RNAuth:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
