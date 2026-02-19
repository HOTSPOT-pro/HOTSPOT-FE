import { GoogleLogin, KakaoLogin } from '@features/auth';
import Main from '@hotspot/ui/assets/images/character/main.svg';

export const LoginPage = () => {
  return (
    <div className="flex flex-col w-full h-screen justify-center">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-30 h-30 bg-purple-800 flex justify-center items-center rounded-3xl">
          <Main className="w-20 h-20" />
        </div>
        <p className="text-2xl font-black mt-8 text-black">hotspot</p>
        <p className="mt-2 text-gray-500 font-normal text-sm">가족 결합 데이터 관리 서비스</p>
      </div>
      <div className="flex flex-col gap-2 p-4 pb-10">
        <KakaoLogin />
        <GoogleLogin />
      </div>
      <div className="absolute w-screen h-screen flex justify-center items-center">
        <div className="absolute w-200 h-200 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
      </div>
    </div>
  );
};
