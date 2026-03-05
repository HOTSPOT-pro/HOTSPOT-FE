import {
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { patchApproveApplication } from '@/features/apply/api/patchApproveApplication';
import type { PatchApplicationStatusRequest } from '@/features/apply/api/types';
import type { ApiErrorResponse } from '@/shared/api/types';

type ApproveApplicationMutationOptions = UseMutationOptions<
  void,
  AxiosError<ApiErrorResponse> | Error,
  PatchApplicationStatusRequest
>;

export const useApproveApplicationMutation = (
  options?: ApproveApplicationMutationOptions,
): UseMutationResult<void, AxiosError<ApiErrorResponse> | Error, PatchApplicationStatusRequest> => {
  return useMutation({
    mutationFn: patchApproveApplication,
    ...options,
  });
};
