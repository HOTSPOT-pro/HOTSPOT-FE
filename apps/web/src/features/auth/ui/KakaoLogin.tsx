'use client';

import KakaoIcon from '@hotspot/ui/assets/icons/kakao.svg';
import { buttonVariants } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import Link from 'next/link';
import { KakaoLoginLink } from '../constants/loginLink';

export const KakaoLogin = ({ className }: { className?: string }) => {
  return (
    <Link
      className={buttonVariants({
        className: cn(
          'bg-kakao-container text-kakao-label hover:bg-yellow-400 flex items-center justify-center gap-8',
          className,
        ),
        variant: 'solid',
      })}
      href={KakaoLoginLink}
    >
      <KakaoIcon />
      <span>카카오로 시작하기</span>
    </Link>
  );
};
