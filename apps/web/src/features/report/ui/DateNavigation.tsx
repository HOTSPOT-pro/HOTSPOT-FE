'use client';

import DownArrow from '@hotspot/ui/assets/images/icon/arrow-down.svg';
import LeftArrow from '@hotspot/ui/assets/images/icon/arrow-left.svg';
import RightArrow from '@hotspot/ui/assets/images/icon/arrow-right.svg';
import UpArrow from '@hotspot/ui/assets/images/icon/arrow-up.svg';
import { MonthPicker } from '@shared/ui';
import { useState } from 'react';

interface DateNavigationProps {
  date: { year: number; month: number };
  onChange: (year: number, month: number) => void;
}

export const DateNavigation = ({ date, onChange }: DateNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const moveMonth = (step: number) => {
    let newMonth = date.month + step;
    let newYear = date.year;

    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    }

    const isFuture = newYear > currentYear || (newYear === currentYear && newMonth > currentMonth);
    if (!isFuture) onChange(newYear, newMonth);
  };

  const isNextDisabled =
    date.year > currentYear || (date.year === currentYear && date.month >= currentMonth);

  return (
    <div className="relative flex w-full items-center gap-2 ">
      <button
        className="p-2 rounded-md hover:bg-gray-50"
        onClick={() => moveMonth(-1)}
        type="button"
      >
        <LeftArrow className="text-gray-500" />
      </button>

      <button
        className="px-4 py-2 w-full rounded-md bg-white font-bold"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div className="flex flex-row items-center justify-center">
          {date.year}년 {date.month}월{' '}
          {isOpen ? <UpArrow className="text-gray-500" /> : <DownArrow className="text-gray-500" />}
        </div>
      </button>

      <button
        className="p-2 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isNextDisabled}
        onClick={() => moveMonth(1)}
        type="button"
      >
        <RightArrow className="text-gray-500" />
      </button>

      {isOpen ? (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30">
          <MonthPicker
            month={date.month}
            onChange={(y, m) => {
              onChange(y, m);
              setIsOpen(false);
            }}
            year={date.year}
          />
        </div>
      ) : null}
    </div>
  );
};
