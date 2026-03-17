'use client';
import { useModal } from '@hotspot/ui';
import ViewRightAnimatedIcon from '@hotspot/ui/assets/images/character/view-right-animated.svg';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAnalyzeData } from '@/domains/analyze/model/useAnalyzeData';
import { AnalyzeReportPage } from '@/pages-layer/analyze';

const page = () => {
  const param = useParams();
  const subId = Number(param.subId);
  const router = useRouter();
  const { open } = useModal();
  const reportId = Number(param.reportId);
  const { analyzeData, isLoading, isError, errorMessage } = useAnalyzeData({
    reportId: reportId,
    subId: Number(subId),
  });

  useEffect(() => {
    if (isError) {
      open('errorModal', {
        props: {
          content: errorMessage || '분석 데이터를 가져오지 못했습니다.',
          onConfirm: () => router.back(),
          title: '데이터 로드 실패',
        },
      });
    }
  }, [isError, errorMessage, open, router]);

  if (isLoading)
    return (
      <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
        <ViewRightAnimatedIcon className="animate-bounce" />
        <p className="text-gray-500 items-center justify-center">
          <span>리포트를 불러오는 중입니다</span>
          <span className="animate-dot-appear-1 inline-block">.</span>
          <span className="animate-dot-appear-2 inline-block">.</span>
          <span className="animate-dot-appear-3 inline-block">.</span>
        </p>
      </div>
    );
  if (isError || !analyzeData) {
    return null;
  }

  return <AnalyzeReportPage data={analyzeData} />;
};

export default page;
