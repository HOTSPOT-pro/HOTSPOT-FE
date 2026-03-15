import { notFound } from 'next/navigation';
import { getAnalyzeData } from '@/domains/analyze';
import { AnalyzeReportPage } from '@/pages-layer/analyze';

interface PageProps {
  params: Promise<{ subId: string }>;
}

const page = async ({ params }: PageProps) => {
  const { subId } = await params;
  const numericSubId = Number(subId);

  if (Number.isNaN(numericSubId)) {
    notFound();
  }

  try {
    const data = await getAnalyzeData.getWeeklyReport(numericSubId);
    return <AnalyzeReportPage data={data} />;
  } catch {
    notFound();
  }
};

export default page;
