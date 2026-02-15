'use client';

import { cn } from '../../lib/cssMerge';

interface ToggleProps {
  id: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle = ({ id, checked, onChange, disabled, className }: ToggleProps) => {
  return (
    <label
      className={cn(
        'cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      htmlFor={id}
    >
      <div className="relative">
        <input
          checked={checked}
          className="sr-only peer"
          disabled={disabled}
          id={id}
          onChange={(e) => onChange?.(e.target.checked)}
          type="checkbox"
        />

        <div
          className="w-11 h-6.5 bg-gray-200 rounded-full peer 
                        peer-checked:bg-purple-600
                        transition-colors duration-200 ease-in-out"
        />

        <div
          className="absolute top-0.5 left-0.5 w-5.5 h-5.5 bg-white rounded-full shadow-sm 
                        transition-transform duration-200 ease-in-out 
                        peer-checked:translate-x-4.5"
        />
      </div>
    </label>
  );
};
