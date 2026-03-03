'use client';

import KakaoIcon from '@hotspot/ui/assets/icons/kakao.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import Link from 'next/link';
import { KakaoLoginLink } from '../constants/loginLink';

export const KakaoLogin = ({ className }: { className?: string }) => {
  return (
    <Button
      className={cn('bg-kakao-container text-kakao-label hover:bg-yellow-400', className)}
      type="button"
      variant="solid"
    >
      <Link className="w-full h-full flex items-center justify-center gap-2" href={KakaoLoginLink}>
        <KakaoIcon />
        <span>카카오로 시작하기</span>
      </Link>
    </Button>
  );
};
