import { postOnboarding } from '@entities/onboarding';
import type { OnboardingInfo } from '@entities/user';
import { toPureDigits } from '@shared/lib';
import { useRouter } from 'next/navigation';

export const useOnboarding = () => {
  const router = useRouter();

  const submitOnboarding = async (data: OnboardingInfo) => {
    try {
      await postOnboarding({
        birthDate: toPureDigits(data.birth),
        phoneNumber: toPureDigits(data.tel),
      });
      router.replace('/');
    } catch (error) {
      console.error('온보딩 처리 중 에러:', error);
      throw error;
    }
  };

  return { submitOnboarding };
};
