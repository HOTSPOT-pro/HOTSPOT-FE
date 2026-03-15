'use client';
import { useParams } from 'next/navigation';
import { AnalyzeHistoryPage } from '@/pages-layer/analyze';

const page = () => {
  const param = useParams();
  const subId = Number(param.subId);
  return <AnalyzeHistoryPage subId={subId} />;
};

export default page;
