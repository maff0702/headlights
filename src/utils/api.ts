import { API_URL } from './constants';
import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' }
});

axiosAPI.interceptors.request.use(config => {
  config.headers = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  return config;
});

export default axiosAPI;
