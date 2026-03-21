'use client';

import { useModal } from '@hotspot/ui';
import ViewRightAnimatedIcon from '@hotspot/ui/assets/images/character/view-right-animated.svg';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSubscribeInfo } from '@/domains/analyze';
import { AnalyzePayPage, AnalyzeSelectPage } from '@/pages-layer/analyze';
import type { ApiErrorResponse } from '@/shared/api/types';

const SubscribeSwitch = () => {
  const { subscribeData } = useSubscribeInfo();
  const isSubscribed = subscribeData?.subscribed ?? false;

  return <section>{isSubscribed ? <AnalyzeSelectPage /> : <AnalyzePayPage />}</section>;
};

const LoadingFallback = () => (
  <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
    <ViewRightAnimatedIcon className="animate-bounce" />
    <p className="text-gray-500">
      <span>결제 정보를 확인하는 중입니다</span>
      <span className="animate-dot-appear-1 inline-block">.</span>
      <span className="animate-dot-appear-2 inline-block">.</span>
      <span className="animate-dot-appear-3 inline-block">.</span>
    </p>
  </div>
);

const AnalyzeSection = () => {
  const { open } = useModal();
  const router = useRouter();

  return (
    <ErrorBoundary
      fallback={
        <div className="p-10 text-center text-red-400">결제 정보를 불러올 수 없습니다.</div>
      }
      onError={(error) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const serverMessage = axiosError.response?.data?.message;
        open('errorModal', {
          props: {
            content: serverMessage || '결제 정보를 가져오지 못했습니다.',
            onConfirm: () => router.back(),
            title: '오류',
          },
        });
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <SubscribeSwitch />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AnalyzeSection;
