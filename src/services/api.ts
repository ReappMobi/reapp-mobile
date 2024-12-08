import axios from 'axios';

import config from '../config';

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus() {
    return true;
  },
});
export default api;
