import {
  CategoryusageSection,
  DailyusageSection,
  FeedbackSection,
  HourlyusageSection,
  OverviewCard,
} from '@features/analyze';
import type { AIReportData } from '@/domains/analyze';
import { formatReportTitle } from '@/features/analyze/lib/format';

interface ReportPageProps {
  data: AIReportData;
}

export const AnalyzeReportPage = ({ data }: ReportPageProps) => {
  const {
    name,
    weekStartDate,
    weekEndDate,
    overview,
    dailyUsage,
    hourlyUsage,
    categoryUsageList,
    finalFeedback,
  } = data;

  console.log(finalFeedback);

  return (
    <div className="mx-auto min-h-screen flex flex-col">
      {/* title */}
      <div className="flex items-center justify-between px-20 py-10 bg-white">
        <span className="font-heading-heading2 text-gray-900">
          {formatReportTitle(weekStartDate, weekEndDate)}
        </span>
        <span className="text-[13px] text-gray-500">{name}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-20 pt-12 overflow-y-auto">
        <OverviewCard overview={overview} />
        <DailyusageSection dailyUsage={dailyUsage} />
        <HourlyusageSection hourlyUsage={hourlyUsage} />
        <CategoryusageSection categoryUsageList={categoryUsageList} />
        <FeedbackSection finalFeedback={finalFeedback} />
      </div>
    </div>
  );
};
