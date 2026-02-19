import { ProgressBar } from '@hotspot/ui/components';
import { COLORS, cn } from '@hotspot/ui/lib';
import type { ReportAppUsage } from '../model/type';

interface ServiceReportProps {
  userName?: string | null;
  isTotal: boolean;
  data: ReportAppUsage[];
}

export const ServiceReport = ({ userName, data, isTotal }: ServiceReportProps) => {
  return (
    <div className="mt-8 p-5 bg-white rounded-3xl flex flex-col gap-1">
      <p className="text-md font-bold leading-relaxed text-gray-900">앱별 상세 사용량</p>

      <p className="text-sm text-gray-600 mb-2">{isTotal ? '전체' : userName}</p>

      <div className="flex flex-col gap-3 h-fit">
        {data.map((item, index) => (
          <div className="w-full flex flex-row gap-3 items-center" key={`${item.appName}-${index}`}>
            <div
              className={cn(
                'h-full aspect-square flex flex-none items-center justify-center rounded-full text-base font-bold p-3',
                index === 0 ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600',
              )}
            >
              {index + 1}
            </div>

            <div className="flex-1 flex flex-col gap-1 min-w-0 py-1 w-full">
              <div className="flex flex-row justify-between font-bold text-black">
                <p>{item.appName}</p>

                <p>{item.usage} GB</p>
              </div>

              <ProgressBar
                color={index === 0 ? COLORS.START : COLORS.SECONDARY}
                label={`ServiceUsage${index}`}
                total={item.limit}
                value={item.usage}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
