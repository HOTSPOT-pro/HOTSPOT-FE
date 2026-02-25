/** biome-ignore-all lint/correctness/noProcessGlobal: <process import 방지> */
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';
import { getAuthInfoFromToken } from '../lib';
import { setAuth } from '../store/slices/userSlice';
import { store } from '../store/store';

export const publicApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await publicApi.post('/api/v1/auth/reissue');
        const { accessToken } = data;
        const decoded = getAuthInfoFromToken(accessToken);

        if (decoded) {
          localStorage.setItem('accessToken', accessToken);
          store.dispatch(
            setAuth({
              accessToken,
              userId: Number(decoded.id),
              userName: decoded.name,
            }),
          );

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
