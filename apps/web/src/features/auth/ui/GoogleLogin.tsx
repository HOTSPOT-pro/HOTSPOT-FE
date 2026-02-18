import Google from '@hotspot/ui/assets/images/icon/Google.svg';
import React from 'react';

export const GoogleLogin = () => {
  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 bg-google-container border border-google-border text-sm font-bold text-google-label"
      type="button"
    >
      <Google />
      <span>Google로 시작하기</span>
    </button>
  );
};
