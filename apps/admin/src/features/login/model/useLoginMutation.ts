import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { postLogin } from '@/features/login/api/postLogin';
import type { LoginRequest, LoginResponse } from '@/features/login/api/types';
import type { ApiErrorResponse } from '@/shared/api/types';

type LoginMutationOptions = UseMutationOptions<
  LoginResponse,
  AxiosError<ApiErrorResponse> | Error,
  LoginRequest
>;

export const useLoginMutation = (
  options?: LoginMutationOptions,
): UseMutationResult<LoginResponse, AxiosError<ApiErrorResponse> | Error, LoginRequest> => {
  return useMutation({
    mutationFn: postLogin,
    ...options,
  });
};
