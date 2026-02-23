'use client';
import Google from '@hotspot/ui/assets/images/icon/Google.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import { useSocialLogin } from '../api/useSocialLogin';

export const GoogleLogin = ({ className }: { className?: string }) => {
  const { loginWithGoogle } = useSocialLogin();
  return (
    <Button
      className={cn(
        'bg-google-container border border-google-border text-google-label hover:bg-gray-100',
        className,
      )}
      onClick={loginWithGoogle}
      type="button"
    >
      <Google />
      <span>Google로 시작하기</span>
    </Button>
  );
};
