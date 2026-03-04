import { api } from '@/shared/api/client';
import type { LoginRequest, LoginResponse } from './types';

export const postLogin = async ({ adminCode }: LoginRequest) => {
  const response = await api.post<LoginResponse>('/api/v1/admin/auth/login', {
    adminCode,
  });

  return response.data;
};
