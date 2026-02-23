'use client';

import { useState } from 'react';
import { cn } from '../../lib/cssMerge';

export interface TabItem<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  activeValue?: T;
  onTabChange?: (value: T) => void;
  defaultValue?: T;
  variant?: 'underline' | 'segment';
  className?: string;
}

export const Tab = <T extends string>({
  items,
  activeValue: controlledValue,
  onTabChange,
  defaultValue,
  variant = 'underline',
  className,
}: TabsProps<T>) => {
  const [internalValue, setInternalValue] = useState<T>(defaultValue || (items[0]?.value as T));
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const handleTabClick = (value: T) => {
    if (!isControlled) {
      setInternalValue(value);
    }
    onTabChange?.(value);
  };

  return (
    <div
      className={cn(
        'flex w-full',
        variant === 'underline' && 'border-b-2 border-gray-100',
        variant === 'segment' && 'p-1 rounded-xl gap-2',
        className,
      )}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = activeValue === item.value;

        return (
          <button
            aria-selected={isActive}
            className={cn(
              'w-full transition-all duration-200 font-bold text-sm relative whitespace-nowrap flex-1',

              variant === 'underline' && [
                'py-3 text-base font-semibold',
                isActive ? 'text-black' : 'text-gray-300 hover:text-gray-600',
              ],
              variant === 'segment' && [
                'py-3 rounded-lg',
                isActive
                  ? 'bg-purple-600 text-white shadow-sm border border-purple-600'
                  : 'border border-gray-200 text-black bg-white hover:bg-gray-100',
              ],
            )}
            key={item.value}
            onClick={() => handleTabClick(item.value)}
            role="tab"
            type="button"
          >
            {item.label}
            {variant === 'underline' && isActive && (
              <div className="absolute -bottom-0.5 left-0 right-0 h-1 bg-purple-600" />
            )}
          </button>
        );
      })}
    </div>
  );
};
