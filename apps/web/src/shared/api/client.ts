/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
import axios, { type AxiosInstance } from 'axios';

const API_TIMEOUT = 10000;
const HTTP_STATUS_UNAUTHORIZED = 401;

export const createClientApi = (): AxiosInstance =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: API_TIMEOUT,
    withCredentials: true,
  });

export const api: AxiosInstance = createClientApi();

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HTTP_STATUS_UNAUTHORIZED && !originalRequest._retry) {
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
