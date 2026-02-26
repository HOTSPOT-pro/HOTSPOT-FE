import { GoogleLogin } from './GoogleLogin';
import { KakaoLogin } from './KakaoLogin';

const SOCIAL_BUTTON_BASE_STYLES =
  'flex w-full items-center justify-center gap-2 rounded-sm py-3 text-sm font-bold';

export const SocialLoginButtons = () => {
  return (
    <div className="z-header flex flex-col gap-2 p-4 pb-10">
      <KakaoLogin className={SOCIAL_BUTTON_BASE_STYLES} />
      <GoogleLogin className={SOCIAL_BUTTON_BASE_STYLES} />
    </div>
  );
};
