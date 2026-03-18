'use client';

import { useModal } from '@hotspot/ui';
import ViewRightAnimatedIcon from '@hotspot/ui/assets/images/character/view-right-animated.svg';
import type { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary'; // 라이브러리 사용 권장
import { useAnalyzeData } from '@/domains/analyze/model/useAnalyzeData';
import { AnalyzeReportPage } from '@/pages-layer/analyze';
import type { ApiErrorResponse } from '@/shared/api/types';

const ReportContent = ({ subId, reportId }: { subId: number; reportId: number }) => {
  const { analyzeData } = useAnalyzeData({ reportId, subId });
  return <AnalyzeReportPage data={analyzeData} />;
};

const LoadingFallback = () => (
  <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
    <ViewRightAnimatedIcon className="animate-bounce" />
    <p className="text-gray-500">
      <span>리포트를 불러오는 중입니다</span>
      <span className="animate-dot-appear-1 inline-block">.</span>
      <span className="animate-dot-appear-2 inline-block">.</span>
      <span className="animate-dot-appear-3 inline-block">.</span>
    </p>
  </div>
);

const AnalyzePage = () => {
  const param = useParams();
  const subId = Number(param.subId);
  const reportId = Number(param.reportId);
  const router = useRouter();
  const { open } = useModal();

  return (
    <ErrorBoundary
      fallback={<div className="h-dvh w-full" />} // 모달을 띄울 것이므로 빈 화면
      onError={(error) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        const serverMessage = axiosError.response?.data?.message;
        open('errorModal', {
          props: {
            content: serverMessage || '분석 데이터를 가져오지 못했습니다.',
            onConfirm: () => router.back(),
            title: '데이터 로드 실패',
          },
        });
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <ReportContent reportId={reportId} subId={subId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AnalyzePage;
