import Kakao from '@hotspot/ui/assets/images/icon/Kakao.svg';
import React from 'react';

export const KakaoLogin = () => {
  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 bg-kakao-container text-sm font-bold text-kakao-label"
      type="button"
    >
      <Kakao />
      <span>카카오로 시작하기</span>
    </button>
  );
};
