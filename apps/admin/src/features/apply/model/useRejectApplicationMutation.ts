import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { patchRejectApplication } from '@/features/apply/api/patchRejectApplication';
import type { PatchApplicationStatusRequest } from '@/features/apply/api/types';
import type { ApiErrorResponse } from '@/shared/api/types';

type RejectApplicationMutationOptions = UseMutationOptions<
  void,
  AxiosError<ApiErrorResponse> | Error,
  PatchApplicationStatusRequest
>;

export const useRejectApplicationMutation = (
  options?: RejectApplicationMutationOptions,
): UseMutationResult<void, AxiosError<ApiErrorResponse> | Error, PatchApplicationStatusRequest> => {
  return useMutation({
    mutationFn: patchRejectApplication,
    ...options,
  });
};
