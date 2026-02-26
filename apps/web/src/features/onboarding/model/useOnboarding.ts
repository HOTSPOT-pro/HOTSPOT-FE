'use client';

import type { OnboardingInfo } from '@entities/user';
import { toPureDigits } from '@shared/lib';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postOnboarding } from '../api/postOnboarding';

export const useOnboarding = () => {
  const router = useRouter();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: OnboardingInfo) =>
      postOnboarding({
        birthDate: toPureDigits(data.birth),
        phoneNumber: toPureDigits(data.tel),
      }),

    onError: (err) => {
      console.error('온보딩 처리 중 에러:', err);
    },
    onSuccess: () => {
      router.replace('/');
    },
  });

  const submitOnboarding = (data: OnboardingInfo) => {
    mutate(data);
  };

  return { error, isPending, submitOnboarding };
};
