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
  isLimit?: boolean;
}

export const MonthNavigation = ({ date, onChange, isLimit = true }: MonthNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const isWithinRange = (y: number, m: number) => {
    if (!isLimit) return true;

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
    const newDate = new Date(year, month - 1 + step, FIRST_DAY_OF_MONTH);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;

    if (isWithinRange(newYear, newMonth)) {
      onChange(newDate);
    }
  };

  const isPrevDisabled =
    isLimit &&
    !isWithinRange(month === 1 ? year - 1 : year, month === 1 ? MONTHS_IN_YEAR : month - 1);

  const isNextDisabled =
    !isWithinRange(
      month === MONTHS_IN_YEAR ? year + 1 : year,
      month === MONTHS_IN_YEAR ? 1 : month + 1,
    ) || new Date(year, month, FIRST_DAY_OF_MONTH) > today;

  return (
    <div className="relative flex w-full items-center gap-8 ">
      <button
        aria-label="이전 달"
        className="p-8 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isPrevDisabled}
        onClick={() => moveMonth(-1)}
        type="button"
      >
        <LeftArrow className="text-gray-500 w-16 h-16" />
      </button>

      <button
        className="px-16 py-8 w-full rounded-md bg-white font-bold"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="flex flex-row items-center justify-center gap-16 text-black">
          {year}년 {month}월{' '}
          {isOpen ? (
            <UpArrow className="text-gray-500 w-14 h-14" />
          ) : (
            <DownArrow className="text-gray-500 w-14 h-14" />
          )}
        </div>
      </button>

      <button
        aria-label="다음 달"
        className="p-8 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isNextDisabled}
        onClick={() => moveMonth(1)}
        type="button"
      >
        <RightArrow className="text-gray-500 w-16 h-16 " />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 z-30">
          <MonthPicker
            isLimit={isLimit}
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
