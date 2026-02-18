'use client';

import { cn } from 'node_modules/@hotspot/ui/src/lib/cssMerge';

type ViewUnit = 'MONTH' | 'DAY';

interface Props {
  unit: ViewUnit;
  onChange: (unit: ViewUnit) => void;
}

export const ReportTypeSelector = ({ unit, onChange }: Props) => {
  const handleUnitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset;
    if (value) onChange(value as ViewUnit);
  };

  return (
    <div className="flex w-full justify-center gap-2 p-1 bg-gray-100 rounded-lg">
      <button
        className={cn('w-full', unit === 'MONTH' ? 'active-style' : 'inactive-style')}
        data-value="MONTH"
        onClick={handleUnitClick}
        type="button"
      >
        월별
      </button>
      <button
        className={cn('w-full', unit === 'MONTH' ? 'active-style' : 'inactive-style')}
        data-value="DAY"
        onClick={handleUnitClick}
        type="button"
      >
        일별
      </button>
    </div>
  );
};
