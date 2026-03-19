'use client';

import { Button } from '@hotspot/ui/components';

type ViewUnit = 'MONTH' | 'DAY';

interface Props {
  unit: ViewUnit;
  onChange: (unit: ViewUnit) => void;
}

export const MonthDaySelector = ({ unit, onChange }: Props) => {
  const handleUnitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget.dataset;
    if (value) onChange(value as ViewUnit);
  };

  return (
    <div className="flex w-full justify-center gap-8">
      <Button
        data-value="MONTH"
        onClick={handleUnitClick}
        variant={unit === 'MONTH' ? 'solid' : 'ghost'}
      >
        월별
      </Button>
      <Button
        data-value="DAY"
        onClick={handleUnitClick}
        variant={unit === 'DAY' ? 'solid' : 'ghost'}
      >
        일별
      </Button>
    </div>
  );
};
