'use client';

import { cn } from '../../lib/cssMerge';

export interface TabItem<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  activeValue: T;
  onTabChange: (value: T) => void;
  variant?: 'underline' | 'segment';
  isFullWidth?: boolean;
  className?: string;
}

export const Tab = <T extends string>({
  items,
  activeValue,
  onTabChange,
  variant = 'underline',
  isFullWidth = true,
  className,
}: TabsProps<T>) => {
  return (
    <div
      className={cn(
        'flex',
        variant === 'underline' && 'border-b-2 border-gray-100',
        variant === 'segment' && 'p-1 rounded-xl w-fit gap-2',
        isFullWidth ? 'w-full' : 'w-fit',
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
              'transition-all duration-200 font-bold text-sm relative whitespace-nowrap',
              isFullWidth ? 'flex-1' : 'px-4',

              variant === 'underline' && [
                'py-3 text-base font-semibold',
                isActive ? 'text-black' : 'text-gray-300 hover:text-gray-600',
              ],
              variant === 'segment' && [
                'py-3 rounded-lg',
                isActive
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'border border-gray-200 text-black bg-white hover:bg-gray-100',
              ],
            )}
            key={item.value}
            onClick={() => onTabChange(item.value)}
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
