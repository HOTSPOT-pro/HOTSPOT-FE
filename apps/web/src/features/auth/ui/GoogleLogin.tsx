'use client';

import GoogleIcon from '@hotspot/ui/assets/icons/google.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import Link from 'next/link';
import { GoogleLoginLink } from '../constants/loginLink';

export const GoogleLogin = ({ className }: { className?: string }) => {
  return (
    <Button
      className={cn(
        'bg-google-container border border-google-border text-google-label hover:bg-gray-100',
        className,
      )}
      type="button"
    >
      <Link className="w-full h-full flex items-center justify-center gap-2" href={GoogleLoginLink}>
        <GoogleIcon />
        <span>Google로 시작하기</span>
      </Link>
    </Button>
  );
};
