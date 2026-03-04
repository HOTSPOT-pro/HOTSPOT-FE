import type { ApiResponse } from '@/shared/api/types';

export interface LoginRequest {
  adminCode: string;
}

export interface LoginPayload {
  accessToken: string;
}

export type LoginResponse = ApiResponse<LoginPayload>;
