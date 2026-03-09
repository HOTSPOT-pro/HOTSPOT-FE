'use client';

import LeftArrow from '@hotspot/ui/assets/icons/arrow-left.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import { cn } from '@hotspot/ui/lib';
import { useState } from 'react';

const MAX_MONTHS_LOOKBACK = 6;
const MONTHS_IN_YEAR = 12;
const FIRST_DAY_OF_MONTH = 1;

interface MonthPickerProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}

export const MonthPicker = ({ year, month, onChange }: MonthPickerProps) => {
  const [viewYear, setViewYear] = useState(year);
  const months = Array.from({ length: MONTHS_IN_YEAR }, (_, i) => i + 1);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const minLimitDate = new Date(
    currentYear,
    currentMonth - MAX_MONTHS_LOOKBACK,
    FIRST_DAY_OF_MONTH,
  );
  const minLimitYear = minLimitDate.getFullYear();

  const handlePrevYear = () => setViewYear((prev) => prev - 1);
  const handleNextYear = () => setViewYear((prev) => prev + 1);

  return (
    <div className="w-100 h-full p-4 rounded-2xl ring-gray-200/50 ring-1 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4 pb-2">
        <button
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
          disabled={viewYear <= minLimitYear}
          onClick={handlePrevYear}
          type="button"
        >
          <LeftArrow className="text-gray-500 w-4 h-4" />
        </button>
        <span className="font-bold text-lg text-black">{viewYear}년</span>
        <button
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
          disabled={viewYear >= currentYear}
          onClick={handleNextYear}
          type="button"
        >
          <RightArrow className="text-gray-500 w-4 h-4 " />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {months.map((m) => {
          const isSelected = year === viewYear && month === m;

          const targetDate = new Date(viewYear, m - 1, FIRST_DAY_OF_MONTH);
          const maxDate = new Date(currentYear, currentMonth - 1, FIRST_DAY_OF_MONTH);
          const minDate = new Date(
            currentYear,
            currentMonth - MAX_MONTHS_LOOKBACK,
            FIRST_DAY_OF_MONTH,
          );

          const isOutOfRange = targetDate < minDate || targetDate > maxDate;

          return (
            <button
              className={cn(
                'py-3 px-7 w-22.5 rounded-xl text-sm transition-colors',
                isSelected && 'bg-purple-600 text-white font-semibold',
                !(isSelected || isOutOfRange) && 'hover:bg-purple-50 text-gray-700',
                isOutOfRange && 'text-gray-300 cursor-not-allowed',
              )}
              disabled={isOutOfRange}
              key={m}
              onClick={() => !isOutOfRange && onChange(viewYear, m)}
              type="button"
            >
              {m}월
            </button>
          );
        })}
      </div>
    </div>
  );
};
