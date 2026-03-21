'use client';

import GoogleIcon from '@hotspot/ui/assets/icons/google.svg';
import { buttonVariants } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import Link from 'next/link';
import { GoogleLoginLink } from '../constants/loginLink';

export const GoogleLogin = ({ className }: { className?: string }) => {
  return (
    <Link
      className={buttonVariants({
        className: cn(
          'bg-google-container border border-google-border text-google-label hover:bg-gray-100 flex items-center justify-center gap-8',
          className,
        ),
        variant: 'solid',
      })}
      href={GoogleLoginLink}
    >
      <GoogleIcon />
      <span>Google로 시작하기</span>
    </Link>
  );
};
