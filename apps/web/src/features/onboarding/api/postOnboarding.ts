import { api } from '@shared/api';
import type { PostOnboardingReqeust } from './types';

export const postOnboarding = async ({ phoneNumber, birthDate }: PostOnboardingReqeust) => {
  const { data } = await api.post(`/api/v1/auth/onboarding`, {
    birthDate: birthDate,
    phoneNumber: phoneNumber,
  });
  return data;
};
