import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.0.139:8080/api',
});

export default api;
