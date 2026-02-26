import { type ApiResponse, api } from '@shared/api';
import type { PostOnboardingRequest, PostOnboardingResponse } from './types';

export const postOnboarding = async ({ phoneNumber, birthDate }: PostOnboardingRequest) => {
  const { data } = await api.post<ApiResponse<PostOnboardingResponse>>(`/api/v1/auth/onboarding`, {
    birthDate,
    phoneNumber,
  });

  return data.data;
};
