/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
import axios, { type AxiosInstance } from 'axios';
import { ROUTES } from '..';

const LOGIN_PATH = '/api/v1/admin/auth/login';

export const createClientApi = (): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
    withCredentials: true,
  });

export const api: AxiosInstance = createClientApi();

const isLoginRequest = (url?: string): boolean => {
  if (!url) {
    return false;
  }

  try {
    const parsed = new URL(url, 'http://localhost');
    return parsed.pathname === LOGIN_PATH;
  } catch {
    return false;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isLoginRequest(originalRequest.url)) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      if (typeof window !== 'undefined') {
        window.location.replace(ROUTES.LOGIN);
        return new Promise(() => {});
      }
    }
    return Promise.reject(error);
  },
);
