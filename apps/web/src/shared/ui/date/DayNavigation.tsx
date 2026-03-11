'use client';

import DownArrow from '@hotspot/ui/assets/icons/arrow-down.svg';
import LeftArrow from '@hotspot/ui/assets/icons/arrow-left.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import UpArrow from '@hotspot/ui/assets/icons/arrow-up.svg';
import { useState } from 'react';
import { DayPicker } from './DayPicker';

const MAX_MONTHS_LOOKBACK = 6;
const FIRST_DAY_OF_MONTH = 1;
const RESET_TIME = 0;

interface DayNavigationProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const DayNavigation = ({ date, onChange }: DayNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  today.setHours(RESET_TIME, RESET_TIME, RESET_TIME, RESET_TIME);

  const minDate = new Date(
    today.getFullYear(),
    today.getMonth() - MAX_MONTHS_LOOKBACK,
    FIRST_DAY_OF_MONTH,
  );
  minDate.setHours(RESET_TIME, RESET_TIME, RESET_TIME, RESET_TIME);

  const isWithinRange = (target: Date) => {
    const targetDate = new Date(target.getFullYear(), target.getMonth(), target.getDate());
    return targetDate >= minDate && targetDate <= today;
  };

  const moveDay = (step: number) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + step);
    if (isWithinRange(newDate)) {
      onChange(newDate);
    }
  };

  const prevDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
  const isPrevDisabled = !isWithinRange(prevDate);

  const nextDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  const isNextDisabled = !isWithinRange(nextDate);

  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

  return (
    <div className="relative flex w-full items-center gap-2">
      <button
        aria-label="이전 날"
        className="p-2 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isPrevDisabled}
        onClick={() => moveDay(-1)}
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
          {formattedDate}
          {isOpen ? (
            <UpArrow className="text-gray-500 w-3.5 h-3.5" />
          ) : (
            <DownArrow className="text-gray-500 w-3.5 h-3.5" />
          )}
        </div>
      </button>

      <button
        aria-label="다음 날"
        className="p-2 rounded-md hover:bg-gray-50 disabled:opacity-30"
        disabled={isNextDisabled}
        onClick={() => moveDay(1)}
        type="button"
      >
        <RightArrow className="text-gray-500 w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-30">
          <DayPicker
            onSelect={(newDate) => {
              onChange(newDate);
              setIsOpen(false);
            }}
            selectedDate={date}
          />
        </div>
      )}
    </div>
  );
};
