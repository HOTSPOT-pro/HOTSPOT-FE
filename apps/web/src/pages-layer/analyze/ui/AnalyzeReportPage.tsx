import {
  CategoryusageSection,
  DailyusageSection,
  FeedbackSection,
  formatDateRange,
  HourlyusageSection,
  OverviewCard,
} from '@features/analyze';
import type { AIReportData } from '@/domains/analyze';

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
    final_feedback,
  } = data;

  return (
    <div className="mx-auto min-h-screen flex flex-col">
      {/* title */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white">
        <span className="text-[15px] font-bold text-gray-900">
          3월 5주차 리포트 ({formatDateRange(weekStartDate, weekEndDate)})
        </span>
        <span className="text-[13px] text-gray-500">{name}</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-3 overflow-y-auto">
        <OverviewCard overview={overview} />
        <DailyusageSection dailyUsage={dailyUsage} />
        <HourlyusageSection hourlyUsage={hourlyUsage} />
        <CategoryusageSection categoryUsageList={categoryUsageList} />
        <FeedbackSection finalFeedback={final_feedback} />
      </div>
    </div>
  );
};
