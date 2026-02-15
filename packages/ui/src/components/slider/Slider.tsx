'use client';
import type React from 'react';
import { useState } from 'react';
import { cn } from '../../lib/cssMerge';

interface SliderProps {
  min: number;
  max: number;
  initialValue?: number;
  onChange?: (value: number) => void;
  className?: string;
}

export const Slider = ({ min, max, initialValue = min, onChange, className }: SliderProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full py-4', className)}>
      <div className="relative w-full h-1.5 group">
        <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-full" />
        <div
          className="absolute inset-0 h-full bg-purple-600 rounded-full"
          style={{ width: `${percentage}%` }}
        />

        {/* 더럽다면 추후 global css로 빼기 */}
        <input
          className="absolute inset-0 w-full h-full bg-transparent appearance-none cursor-pointer accent-purple-600
                     [&::-webkit-slider-thumb]:appearance-none 
                     [&::-webkit-slider-thumb]:w-5 
                     [&::-webkit-slider-thumb]:h-5 
                     [&::-webkit-slider-thumb]:rounded-full 
                     [&::-webkit-slider-thumb]:bg-purple-600
                     [&::-webkit-slider-thumb]:border-2 
                     [&::-webkit-slider-thumb]:border-purple-600"
          max={max}
          min={min}
          onChange={handleChange}
          step={5}
          type="range"
          value={value}
        />
      </div>
      <div className="flex justify-between mt-2 text-sm font-medium text-gray-600">
        <span>{value}GB</span>
        <span className="text-gray-600">최대 {max}GB</span>
      </div>
    </div>
  );
};
