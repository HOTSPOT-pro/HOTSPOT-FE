'use client';

import ArrowDownIcon from '@hotspot/ui/assets/icons/arrow-down.svg';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface CategorySelectOption<T extends string = string> {
  label: string;
  value: T;
}

interface CategorySelectProps<T extends string = string> {
  options: CategorySelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export const CategorySelect = <T extends string = string>({
  options,
  value,
  onChange,
  className,
}: CategorySelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(() => {
    return options.find((option) => option.value === value)?.label ?? '';
  }, [options, value]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div className={`relative inline-block ${className ?? ''}`} ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex w-full items-center gap-2 rounded-md p-2 text-[0.8rem] font-semibold text-black"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span>{selectedLabel}</span>
        <ArrowDownIcon
          className={`h-6 w-6 text-black transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute mt-[-2.9rem] z-20 max-h-72 w-full overflow-auto rounded-md border border-gray-200 bg-white py-2 shadow-lg">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value}>
                <button
                  aria-pressed={isSelected}
                  className={`w-full p-2 text-left text-[0.8rem] hover:bg-gray-50 ${
                    isSelected ? 'font-semibold text-gray-900' : 'text-gray-700'
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
