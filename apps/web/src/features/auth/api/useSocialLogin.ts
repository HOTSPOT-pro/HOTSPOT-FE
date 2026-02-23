'use client';
import { useRouter } from 'next/navigation';
import type { UserAuth } from '@/entities/user/model/type';
import { useUserStore } from '../store/useUserStore';

export const useSocialLogin = () => {
  const { setAuth } = useUserStore();
  const router = useRouter();

  const loginWithGoogle = async () => {
    const mockGoogleUser: UserAuth = {
      accessToken: 'g-token-xxx',
      userId: 123,
      userName: '구글',
    };

    setAuth(mockGoogleUser);
    router.push('/onboarding');
  };

  const loginWithKakao = async () => {
    const mockKakaoUser: UserAuth = {
      accessToken: 'k-token-yyy',
      userId: 12345,
      userName: '카카오톡',
    };

    setAuth(mockKakaoUser);
    router.push('/onboarding');
  };

  return { loginWithGoogle, loginWithKakao };
};
