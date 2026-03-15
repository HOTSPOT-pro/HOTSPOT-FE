'use client';
import { useParams } from 'next/navigation';
import { getAnalyzeData } from '@/domains/analyze';
import { AnalyzeReportPage } from '@/pages-layer/analyze';

const page = async () => {
  const param = useParams();
  const subId = Number(param.subId);
  const data = await getAnalyzeData.getWeeklyReport(subId);

  return <AnalyzeReportPage data={data} />;
};

export default page;
