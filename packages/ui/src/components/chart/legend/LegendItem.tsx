import { memo } from 'react';
import { cn } from '../../../lib/cssMerge';

interface LegendItemProps {
  className?: string;
  color: string;
  name: string;
  valueText?: string;
}

export const LegendItem = memo(({ className, color, name, valueText }: LegendItemProps) => {
  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{name}</span>
      </div>
      {valueText ? (
        <span className="text-sm font-medium text-black whitespace-nowrap">{valueText}</span>
      ) : null}
    </div>
  );
});

LegendItem.displayName = 'LegendItem';
