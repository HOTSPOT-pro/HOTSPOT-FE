'use client';

import ViewRightAnimatedIcon from '@hotspot/ui/assets/images/character/view-right-animated.svg';
import { useSubscribeInfo } from '@/domains/analyze';
import { AnalyzePayPage, AnalyzeSelectPage } from '@/pages-layer/analyze';

const AnalyzeSection = () => {
  const { subscribeData, isLoading, isError, errorMessage } = useSubscribeInfo();
  if (isLoading) {
    return (
      <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
        <ViewRightAnimatedIcon className="animate-bounce" />
        <p className="text-gray-500 items-center justify-center">
          <span>결제 정보를 확인하는 중입니다</span>
          <span className="animate-dot-appear-1 inline-block">.</span>
          <span className="animate-dot-appear-2 inline-block">.</span>
          <span className="animate-dot-appear-3 inline-block">.</span>
        </p>
      </div>
    );
  }
  if (isError) {
    return <section className="p-10 text-center text-red-400">{errorMessage}</section>;
  }
  const isSubscribed = subscribeData?.subscribed ?? false;

  return <section>{isSubscribed ? <AnalyzeSelectPage /> : <AnalyzePayPage />}</section>;
};

export default AnalyzeSection;
