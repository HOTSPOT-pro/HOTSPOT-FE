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
    <div className="z-dropdown elevation-3 rounded-xl border border-gray-100 bg-white p-12">
      <div className="flex flex-col gap-4">
        {header ? <span className="font-body-body3 text-gray-500">{header}</span> : null}

        {sections.map((section, index) => (
          <div
            className={cn(
              'flex flex-col',
              section.dividerTop ? 'border-t border-dotted border-gray-100 pt-4' : '',
            )}
            key={`chart-tooltip-section-${index}`}
          >
            {section.title ? (
              <span className="font-body-body4 text-gray-500">{section.title}</span>
            ) : null}

            <div className="flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="text-lg font-bold text-black">{section.value}</span>
                {section.unit ? (
                  <span className="font-body-body4 text-black">{section.unit}</span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
