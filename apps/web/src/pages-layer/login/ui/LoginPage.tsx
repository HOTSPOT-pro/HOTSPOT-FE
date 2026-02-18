import { GoogleLogin, KakaoLogin } from '@features/auth';
import React from 'react';

export const LoginPage = () => {
  return (
    <div>
      <div>
        <KakaoLogin />
        <GoogleLogin />
      </div>
    </div>
  );
};
