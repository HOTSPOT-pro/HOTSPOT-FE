import { GoogleLogin } from './GoogleLogin';
import { KakaoLogin } from './KakaoLogin';

const SOCIAL_BUTTON_BASE_STYLES =
  'flex w-full items-center justify-center gap-8 rounded-sm text-sm font-bold';

export const SocialLoginButtons = () => {
  return (
    <div className="z-header flex flex-col gap-8 p-16">
      <KakaoLogin className={SOCIAL_BUTTON_BASE_STYLES} />
      <GoogleLogin className={SOCIAL_BUTTON_BASE_STYLES} />
    </div>
  );
};
