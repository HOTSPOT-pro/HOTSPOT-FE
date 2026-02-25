'use client';
import { getLogin } from '@entities/auth';
import GoogleIcon from '@hotspot/ui/assets/icons/google.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';

export const GoogleLogin = ({ className }: { className?: string }) => {
  return (
    <Button
      className={cn(
        'bg-google-container border border-google-border text-google-label hover:bg-gray-100',
        className,
      )}
      onClick={() => getLogin({ provider: 'google' })}
      type="button"
    >
      <GoogleIcon />
      <span>Google로 시작하기</span>
    </Button>
  );
};
