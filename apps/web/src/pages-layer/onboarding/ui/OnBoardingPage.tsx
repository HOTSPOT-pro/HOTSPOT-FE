import { OnBoardingForm } from '@features/onboarding';
import { Logo } from '@shared/ui';

export const OnBoardingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen px-4 pt-12">
      <Logo size="sm" />
      <OnBoardingForm />
    </div>
  );
};
