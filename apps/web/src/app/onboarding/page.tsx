import { TokenHandler } from '@features/auth';
import { OnBoardingPage } from '@pages-layer/onboarding';

const page = () => {
  return (
    <div>
      <TokenHandler />
      <OnBoardingPage />
    </div>
  );
};

export default page;
