'use client';
import KakaoIcon from '@hotspot/ui/assets/icons/kakao.svg';
import { Button } from '@hotspot/ui/components';
import { cn } from '@hotspot/ui/lib';
import { login } from '../api/api';

export const KakaoLogin = ({ className }: { className?: string }) => {
  return (
    <Button
      className={cn('bg-kakao-container text-kakao-label hover:bg-yellow-400', className)}
      onClick={() => login({ provider: 'kakao' })}
      type="button"
      variant="solid"
    >
      <KakaoIcon />
      <span>카카오로 시작하기</span>
    </Button>
  );
};
