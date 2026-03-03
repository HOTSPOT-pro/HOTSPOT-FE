/** biome-ignore-all lint/correctness/noProcessGlobal: <explanation> */
'use client';

import { useUserStore } from '@entities/user';
import type { PostOnboardingResponse } from '@features/onboarding/api/types';
import { toPureDigits } from '@shared/lib';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import type { ApiErrorResponse } from '@/shared/api/types';
import { postOnboarding } from '../api/postOnboarding';
import type { OnboardingInfo } from './types';

const getOnboardingErrorMessage = (error: unknown) => {
  if (!isAxiosError<ApiErrorResponse>(error)) {
    return '온보딩 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';
  }

  const status = error.response?.status;
  const serverCode = error.response?.data?.code;
  const serverMessage = error.response?.data?.message;

  if (serverMessage) return serverMessage;

  if (serverCode === 'INVALID_TOKEN') return '인증이 만료되었어요. 다시 로그인해 주세요.';
  if (serverCode === 'FORBIDDEN') return '권한이 없어요. 관리자에게 문의해 주세요.';
  if (serverCode === 'SERVER_ERROR') return '서버 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';

  if (status === 404) return '회선 정보를 찾을 수 없어요. 입력값을 확인해 주세요.';
  if (status === 400) return '요청값이 올바르지 않아요. 입력 정보를 확인해 주세요.';

  return '온보딩 처리 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.';
};

export const useOnboarding = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const { mutateAsync, isPending, error } = useMutation<
    PostOnboardingResponse,
    unknown,
    OnboardingInfo
  >({
    mutationFn: (data: OnboardingInfo) =>
      postOnboarding({
        birthDate: toPureDigits(data.birth),
        phoneNumber: toPureDigits(data.tel),
      }),

    onError: (err) => {
      console.error('온보딩 처리 중 에러:', err);
    },
    onSuccess: (response) => {
      if (process.env.NODE_ENV !== 'production') {
        console.debug('[onboarding] success response', response);
      }

      setUser({
        email: response.email,
        familyId: response.familyId,
        familyRole: response.familyRole,
        id: response.subId,
        name: response.name,
        phone: response.phone,
      });

      if (process.env.NODE_ENV !== 'production') {
        console.debug('[onboarding] setUser dispatched');
      }

      router.replace('/');
    },
  });

  const submitOnboarding = (data: OnboardingInfo) => mutateAsync(data);

  return {
    error,
    errorMessage: error ? getOnboardingErrorMessage(error) : null,
    isPending,
    submitOnboarding,
  };
};
