import { api } from '@shared/api';
import type { PostOnboardingRequest } from './types';

export const postOnboarding = async ({ phoneNumber, birthDate }: PostOnboardingRequest) => {
  const { data } = await api.post(`/api/v1/auth/onboarding`, {
    birthDate: birthDate,
    phoneNumber: phoneNumber,
  });
  return data;
};
