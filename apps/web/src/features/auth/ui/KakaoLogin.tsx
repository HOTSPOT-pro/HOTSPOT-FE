'use client';
import Kakao from '@hotspot/ui/assets/images/icon/Kakao.svg';
import { Button } from '@hotspot/ui/components';
import { useSocialLogin } from '../api/useSocialLogin';

export const KakaoLogin = () => {
  const { loginWithKakao } = useSocialLogin();
  return (
    <Button
      className="flex w-full items-center justify-center gap-2 rounded-sm py-3 bg-kakao-container text-sm font-bold text-kakao-label hover:bg-yellow-400"
      onClick={loginWithKakao}
      type="button"
      variant="solid"
    >
      <Kakao />
      <span>카카오로 시작하기</span>
    </Button>
  );
};
