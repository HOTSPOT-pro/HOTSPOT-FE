'use client';

import DownArrow from '@hotspot/ui/assets/icons/arrow-down.svg';
import LeftArrow from '@hotspot/ui/assets/icons/arrow-left.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import UpArrow from '@hotspot/ui/assets/icons/arrow-up.svg';
import { useState } from 'react';
import { MonthPicker } from './MonthPicker';

const MAX_MONTHS_LOOKBACK = 6;
const MONTHS_IN_YEAR = 12;
const FIRST_DAY_OF_MONTH = 1;

interface MonthNavigationProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const MonthNavigation = ({ date, onChange }: MonthNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const isWithinRange = (y: number, m: number) => {
    const targetDate = new Date(y, m - 1, FIRST_DAY_OF_MONTH);
    const maxDate = new Date(currentYear, currentMonth - 1, FIRST_DAY_OF_MONTH);
    const earliestDate = new Date(
      currentYear,
      currentMonth - MAX_MONTHS_LOOKBACK,
      FIRST_DAY_OF_MONTH,
    );

    return targetDate >= earliestDate && targetDate <= maxDate;
  };

  const moveMonth = (step: number) => {
    let newMonth = month + step;
    let newYear = year;

    if (newMonth > MONTHS_IN_YEAR) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = MONTHS_IN_YEAR;
      newYear -= 1;
    }

    if (isWithinRange(newYear, newMonth)) {
      onChange(new Date(newYear, newMonth - 1, FIRST_DAY_OF_MONTH));
    }
  };

  const isPrevDisabled = !isWithinRange(
    month === 1 ? year - 1 : year,
    month === 1 ? MONTHS_IN_YEAR : month - 1,
  );

  const isNextDisabled = !isWithinRange(
    month === MONTHS_IN_YEAR ? year + 1 : year,
    month === MONTHS_IN_YEAR ? 1 : month + 1,
  );

  return (
    <div className="relative flex w-full items-center gap-2 ">
      <button
        aria-label="이전 달"
        className="p-2 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isPrevDisabled}
        onClick={() => moveMonth(-1)}
        type="button"
      >
        <LeftArrow className="text-gray-500 w-4 h-4" />
      </button>

      <button
        className="px-4 py-2 w-full rounded-md bg-white font-bold"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="flex flex-row items-center justify-center gap-4 text-black">
          {year}년 {month}월{' '}
          {isOpen ? (
            <UpArrow className="text-gray-500 w-3.5 h-3.5" />
          ) : (
            <DownArrow className="text-gray-500 w-3.5 h-3.5" />
          )}
        </div>
      </button>

      <button
        aria-label="다음 달"
        className="p-2 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isNextDisabled}
        onClick={() => moveMonth(1)}
        type="button"
      >
        <RightArrow className="text-gray-500 w-4 h-4 " />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30">
          <MonthPicker
            month={month}
            onChange={(y, m) => {
              onChange(new Date(y, m - 1, FIRST_DAY_OF_MONTH));
              setIsOpen(false);
            }}
            year={year}
          />
        </div>
      )}
    </div>
  );
};
