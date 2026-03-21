import { api } from '@/shared/api/client';
import type { LoginRequest } from './types';

export const postLogin = async ({ adminCode }: LoginRequest): Promise<void> => {
  await api.post('/api/v1/admin/auth/login', {
    adminCode,
  });
};
