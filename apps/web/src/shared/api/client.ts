/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
import axios, { type AxiosInstance } from 'axios';

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 403) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/api/v1/auth/reissue')) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      try {
        await api.post('/api/v1/auth/reissue', undefined, { withCredentials: true });
        return api(originalRequest);
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
