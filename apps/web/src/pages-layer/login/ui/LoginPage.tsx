import { SocialLoginButtons } from '@features/auth';
import TextLogoImage from '@hotspot/ui/assets/images/logo/text-logo.svg';
import { Logo } from '@shared/ui';

export const LoginPage = () => {
  return (
    <div className="flex min-h-dvh w-full flex-col justify-between bg-[radial-gradient(120%_90%_at_50%_40%,rgba(168,85,247,0.2)_0%,rgba(255,255,255,1)_65%),linear-gradient(180deg,#f5f3ff_0%,#ffffff_45%)]">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Logo size="lg" />
        <TextLogoImage className="mt-32" />
        <p className="font-body-body2 text-gray-500 mt-8">가족 결합 데이터 관리 서비스</p>
      </div>

      <div className="flex flex-col pb-48">
        <SocialLoginButtons />
      </div>
    </div>
  );
};
