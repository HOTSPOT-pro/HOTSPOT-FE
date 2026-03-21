'use client';

import LeftArrow from '@hotspot/ui/assets/icons/arrow-left.svg';
import RightArrow from '@hotspot/ui/assets/icons/arrow-right.svg';
import { cn } from '@hotspot/ui/lib';
import { useEffect, useState } from 'react';

const MAX_MONTHS_LOOKBACK = 6;
const FIRST_DAY_OF_MONTH = 1;
const GRID_CELL_COUNT = 42;
const RESET_TIME = 0;

interface DayPickerProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

export const DayPicker = ({ selectedDate, onSelect }: DayPickerProps) => {
  const [viewDate, setViewDate] = useState(new Date(selectedDate));
  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  useEffect(() => {
    setViewDate(new Date(selectedDate));
  }, [selectedDate]);

  const today = new Date();
  today.setHours(RESET_TIME, RESET_TIME, RESET_TIME, RESET_TIME);

  const minDate = new Date();
  minDate.setMonth(today.getMonth() - MAX_MONTHS_LOOKBACK, FIRST_DAY_OF_MONTH);
  minDate.setHours(RESET_TIME, RESET_TIME, RESET_TIME, RESET_TIME);

  const firstDayOfMonth = new Date(viewYear, viewMonth, FIRST_DAY_OF_MONTH).getDay();
  const lastDateOfMonth = new Date(viewYear, viewMonth + 1, RESET_TIME).getDate();

  const days = Array.from({ length: GRID_CELL_COUNT }, (_, i) => {
    const day = i - firstDayOfMonth + 1;
    return day > 0 && day <= lastDateOfMonth ? day : null;
  });

  const isSelected = (day: number) =>
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  const isDisabled = (day: number) => {
    const target = new Date(viewYear, viewMonth, day);
    return target < minDate || target > today;
  };

  return (
    <div className="w-80 p-4 rounded-2xl ring-1 ring-gray-200/50 shadow-lg bg-white">
      {/* 년/월 이동 */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
          disabled={new Date(viewYear, viewMonth, FIRST_DAY_OF_MONTH) <= minDate}
          onClick={() => setViewDate(new Date(viewYear, viewMonth - 1, FIRST_DAY_OF_MONTH))}
          type="button"
        >
          <LeftArrow className="text-gray-500 w-4 h-4" />
        </button>
        <span className="font-bold text-black">
          {viewYear}년 {viewMonth + 1}월
        </span>
        <button
          className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
          disabled={viewYear >= today.getFullYear() && viewMonth >= today.getMonth()}
          onClick={() => setViewDate(new Date(viewYear, viewMonth + 1, FIRST_DAY_OF_MONTH))}
          type="button"
        >
          <RightArrow className="text-gray-500 w-4 h-4" />
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
          <div className="text-center text-xs text-gray-400 font-medium py-1" key={d}>
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <div className="aspect-square" key={idx}>
            {day && (
              <button
                className={cn(
                  'w-full h-full flex items-center justify-center rounded-xl text-sm transition-all',
                  isSelected(day)
                    ? 'bg-purple-600 text-white font-semibold shadow-md'
                    : 'hover:bg-purple-50 text-gray-700 disabled:text-gray-200 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed',
                )}
                disabled={isDisabled(day)}
                onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
                type="button"
              >
                {day}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
