/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
import axios, { type AxiosInstance } from 'axios';
import { clearAccessToken, getAccessToken } from './token';

export const createClientApi = (): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

export const api: AxiosInstance = createClientApi();

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (!token) {
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/api/v1/admin/auth/login')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      clearAccessToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
