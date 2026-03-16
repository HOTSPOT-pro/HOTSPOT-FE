'use client';
import { useParams } from 'next/navigation';
import { useAnalyzeData } from '@/domains/analyze/model/useAnalyzeData';
import { AnalyzeReportPage } from '@/pages-layer/analyze';

const page = () => {
  const param = useParams();
  const subId = Number(param.subId);
  const reportId = Number(param.reportId);
  const { analyzeData, isLoading, isError, errorMessage } = useAnalyzeData({
    reportId: reportId,
    subId: Number(subId),
  });

  if (isLoading) return <div>데이터 불러오는 중</div>;
  if (isError || !analyzeData)
    return (
      <div>
        분석 리포트를 불러오지 못했습니다.
        <br />
        {errorMessage}
      </div>
    );

  return <AnalyzeReportPage data={analyzeData} />;
};

export default page;
