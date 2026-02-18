import { ProgressBar } from '@hotspot/ui';

import { DESIGN_TOKENS } from '@hotspot/ui/tokens';

import { cn } from 'node_modules/@hotspot/ui/src/lib/cssMerge';

import type { ReportAppUsage } from '../model/type';

interface ServiceReportProps {
  userName: string | null;

  data: ReportAppUsage[];
}

export const ServiceReport = ({ userName, data }: ServiceReportProps) => {
  return (
    <div className="mt-8 bg-white rounded-3xl flex flex-col gap-1">
      <p className="text-md font-bold leading-relaxed text-gray-900">앱별 상세 사용량</p>

      <p className="text-sm text-gray-600 mb-2">{userName || '전체'}</p>

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
              <div className="flex flex-row justify-between font-bold">
                <p>{item.appName}</p>

                <p>{item.usage} GB</p>
              </div>

              <ProgressBar
                color={
                  index === 0
                    ? DESIGN_TOKENS.colors.graph.start
                    : DESIGN_TOKENS.colors.graph.secondary
                }
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
