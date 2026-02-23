'use client';
import Google from '@hotspot/ui/assets/images/icon/Google.svg';
import { Button } from '@hotspot/ui/components';
import { useSocialLogin } from '../api/useSocialLogin';

export const GoogleLogin = () => {
  const { loginWithGoogle } = useSocialLogin();
  return (
    <Button
      className="flex w-full items-center justify-center gap-2 rounded-sm py-3 bg-google-container border border-google-border text-sm font-bold text-google-label hover:bg-gray-100"
      onClick={loginWithGoogle}
      type="button"
    >
      <Google />
      <span>Google로 시작하기</span>
    </Button>
  );
};
