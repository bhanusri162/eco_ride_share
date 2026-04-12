import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getAuthToken, clearAuth } from './auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiGet = (url) => api.get(url).then(res => res.data);
export const apiPost = (url, data) => api.post(url, data).then(res => res.data);
export const apiPut = (url, data) => api.put(url, data).then(res => res.data);
export const apiDelete = (url) => api.delete(url).then(res => res.data);

export default api;