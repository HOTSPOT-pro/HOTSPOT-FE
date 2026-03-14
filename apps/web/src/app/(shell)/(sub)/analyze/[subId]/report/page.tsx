import { getAnalyzeData } from '@/domains/analyze';
import { AnalyzeReportPage } from '@/pages-layer/analyze';

interface PageProps {
  params: { subId: string };
}

const page = async ({ params }: PageProps) => {
  const data = await getAnalyzeData.getWeeklyReport(Number(params.subId));
  return <AnalyzeReportPage data={data} />;
};

export default page;
