import { GoogleLogin } from './GoogleLogin';
import { KakaoLogin } from './KakaoLogin';

export const SocialLoginContainer = () => {
  return (
    <div className="z-header flex flex-col gap-2 p-4 pb-10">
      <KakaoLogin />
      <GoogleLogin />
    </div>
  );
};
