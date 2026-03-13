import { cn } from '../../../lib/cssMerge';

export interface ChartTooltipSection {
  dividerTop?: boolean;
  percent?: number | string;
  title?: string;
  unit?: string;
  value: number | string;
}

interface ChartTooltipProps {
  header?: string;
  sections: ChartTooltipSection[];
}

export const ChartTooltip = ({ header, sections }: ChartTooltipProps) => {
  return (
    <div className="z-dropdown rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
      <div className="flex flex-col gap-1">
        {header ? <span className="text-xs font-medium text-gray-500">{header}</span> : null}

        {sections.map((section, index) => (
          <div
            className={cn(
              'flex flex-col',
              section.dividerTop ? 'border-t border-dotted border-gray-100 pt-1' : '',
            )}
            key={`chart-tooltip-section-${index}`}
          >
            {section.title ? (
              <span className="text-xs font-medium text-gray-500">{section.title}</span>
            ) : null}

            <div className="flex items-baseline justify-between gap-1">
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-black">{section.value}</span>
                {section.unit ? (
                  <span className="text-xs font-semibold text-black">{section.unit}</span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
