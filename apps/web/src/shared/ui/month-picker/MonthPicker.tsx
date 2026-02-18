'use client';

import LeftArrow from '@hotspot/ui/assets/images/icon/ArrowLeft.svg';
import RightArrow from '@hotspot/ui/assets/images/icon/ArrowRight.svg';
import { cn } from 'node_modules/@hotspot/ui/src/lib/cssMerge';
import { useState } from 'react';

interface MonthPickerProps {
  year: number;
  month: number;
  onChange: (year: number, month: number) => void;
}

export const MonthPicker = ({ year, month, onChange }: MonthPickerProps) => {
  const [viewYear, setViewYear] = useState(year);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 오늘 날짜 정보
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // 0~11 이므로 +1

  const handlePrevYear = () => setViewYear((prev) => prev - 1);
  const handleNextYear = () => setViewYear((prev) => prev + 1);

  const handleMonthClick = (m: number) => {
    onChange(viewYear, m);
  };

  return (
    <div className="w-100 h-full p-4 rounded-2xl ring-gray-200/50 ring-1 shadow-lg bg-white">
      <div className="flex items-center justify-between mb-4 pb-2">
        <button className="p-1 hover:bg-gray-100 rounded" onClick={handlePrevYear} type="button">
          <LeftArrow />
        </button>
        <span className="font-bold text-lg">{viewYear}년</span>
        <button
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
          disabled={viewYear >= currentYear}
          onClick={handleNextYear}
          type="button"
        >
          <RightArrow />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-1">
        {months.map((m) => {
          const isSelected = year === viewYear && month === m;
          const isFuture = viewYear > currentYear || (viewYear === currentYear && m > currentMonth);

          return (
            <button
              className={cn(
                'py-3 px-7 w-22.5 rounded-xl text-sm transition-colors',
                !(isFuture || isSelected) && 'hover:bg-purple-50 text-gray-700',
                isSelected && 'bg-purple-600 text-white font-semibold',
                isFuture && 'text-gray-300 cursor-not-allowed',
              )}
              disabled={isFuture}
              key={m}
              onClick={() => !isFuture && handleMonthClick(m)}
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
