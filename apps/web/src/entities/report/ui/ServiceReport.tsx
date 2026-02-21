import { ProgressBar } from '@hotspot/ui/components';
import { COLORS, cn } from '@hotspot/ui/lib';
import type { MemberAppUsage } from '../model/type'; // 타입 임포트 확인

interface ServiceReportProps {
  isTotal: boolean;
  data: MemberAppUsage;
}

export const ServiceReport = ({ data, isTotal }: ServiceReportProps) => {
  const sortedData = [...data.usage].sort((a, b) => b.usage - a.usage);

  if (sortedData.length === 0) {
    return (
      <div className="mt-8 p-10 bg-white rounded-3xl text-center text-gray-400">
        사용 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-8 p-5 bg-white rounded-3xl flex flex-col gap-1">
      <div className="flex justify-between items-end mb-2">
        <p className="text-md font-bold leading-relaxed text-gray-900">앱별 상세 사용량</p>
        <p className="text-sm text-gray-500 font-medium">
          {isTotal ? '전체 리포트' : `${data.name} 님`}
        </p>
      </div>

      <div className="flex flex-col gap-4 h-fit mt-2">
        {sortedData.map((item, index) => {
          return (
            <div
              className="w-full flex flex-row gap-4 items-center"
              key={`${item.appName}-${index}`}
            >
              <div
                className={cn(
                  'w-10 h-10 flex-none flex items-center justify-center rounded-full text-base font-bold',
                  index === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-500',
                )}
              >
                {index + 1}
              </div>

              <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                <div className="flex flex-row justify-between items-center">
                  <p className="font-bold text-gray-900 truncate">{item.appName}</p>
                  <div className="text-right">
                    <span className={cn('font-bold text-gray-900')}>
                      {item.usage.toFixed(1)} GB
                    </span>
                  </div>
                </div>

                <ProgressBar
                  color={index === 0 ? COLORS.START : COLORS.SECONDARY}
                  label={`ServiceUsage-${item.appName}`}
                  total={data.total}
                  value={item.usage}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
