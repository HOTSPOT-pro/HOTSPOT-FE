'use client';
import type React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '../../lib/cssMerge';

interface SliderProps {
  minNum: number;
  maxNum: number;
  step?: number;
  value?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider = ({
  minNum,
  maxNum,
  step = 5,
  value,
  initialValue = minNum,
  onChange,
  className,
}: SliderProps) => {
  const startValue = value ?? initialValue ?? minNum;
  const [internalValue, setInternalValue] = useState(startValue);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const displayValue = value ?? internalValue;
  const percentage = ((displayValue - minNum) / (maxNum - minNum)) * 100;

  return (
    <div className={cn('w-full py-16', className)}>
      <div className="relative w-full h-6 group">
        <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-full" />
        <div
          className="absolute inset-0 h-full bg-purple-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />

        {/* 더럽다면 추후 global css로 빼기 */}
        <input
          className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer accent-purple-600
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-16 
                     [&::-webkit-slider-thumb]:h-16 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-purple-600
                     [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-purple-600"
          max={maxNum}
          min={minNum}
          onChange={handleChange}
          step={step}
          type="range"
          value={displayValue}
        />
      </div>
      <div className="flex justify-between mt-8 text-sm font-medium text-gray-600">
        <span>{minNum}GB</span>
        <span className="text-gray-600">최대 {maxNum}GB</span>
      </div>
    </div>
  );
};
