import { SocialLoginContainer } from '@features/auth';
import { Logo } from '@shared/ui';

export const LoginPage = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center">
      <div className="z-header flex flex-col items-center justify-center h-full">
        <Logo size="lg" />
        <p className="text-2xl font-black mt-8 text-black">hotspot</p>
        <p className="mt-2 text-gray-500 font-normal text-sm">가족 결합 데이터 관리 서비스</p>
      </div>
      <SocialLoginContainer />
      <div className="absolute w-screen h-screen flex justify-center items-center">
        <div className="absolute w-screen h-screen bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      </div>
    </div>
  );
};
