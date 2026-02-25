'use client';
import GoogleIcon from '@hotspot/ui/assets/icons/google.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import { login } from '../api/api';

export const GoogleLogin = ({ className }: { className?: string }) => {
  return (
    <Button
      className={cn(
        'bg-google-container border border-google-border text-google-label hover:bg-gray-100',
        className,
      )}
      onClick={() => login({ provider: 'google' })}
      type="button"
    >
      <GoogleIcon />
      <span>Google로 시작하기</span>
    </Button>
  );
};
