import {
  CategoryusageSection,
  DailyusageSection,
  FeedbackSection,
  HourlyusageSection,
  OverviewCard,
} from '@features/analyze';
import type { AIReportData } from '@/domains/analyze';

interface ReportPageProps {
  data: AIReportData;
}

export const AnalyzeReportPage = ({ data }: ReportPageProps) => {
  const {
    title,
    name,
    weekStartDate,
    weekEndDate,
    overview,
    dailyUsage,
    hourlyUsage,
    categoryUsageList,
    finalFeedback,
  } = data;

  return (
    <div className="mx-auto min-h-screen flex flex-col">
      {/* title */}
      <div className="flex items-center justify-between px-20 py-10 bg-white">
        <div className="flex flex-column">
          <span className="font-heading-heading2 text-gray-900">{title}</span>
          <span className="text-[13px] text-gray-500 whitespace-nowrap">
            {weekStartDate}~{weekEndDate}
          </span>
        </div>

        <span className="text-[13px] text-gray-500 whitespace-nowrap">{name}</span>
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
