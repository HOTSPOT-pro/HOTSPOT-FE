'use client';

import { useModal } from '@hotspot/ui';
import { toPureDigits } from '@shared/lib';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { postOnboarding } from '../api/postOnboarding';
import { ERROR_MESSAGE } from '../constants/messages';
import type { OnboardingInfo } from './types';

export const useOnboarding = () => {
  const router = useRouter();
  const { open } = useModal();
  const handleOpenModal = useCallback(() => {
    open('errorModal', {
      props: {
        content: ERROR_MESSAGE.ONBOARDING_ERROR.message,
        title: ERROR_MESSAGE.ONBOARDING_ERROR.title,
      },
    });
  }, [open]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: OnboardingInfo) =>
      postOnboarding({
        birthDate: toPureDigits(data.birth),
        phoneNumber: toPureDigits(data.tel),
      }),

    onError: () => {
      handleOpenModal();
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
