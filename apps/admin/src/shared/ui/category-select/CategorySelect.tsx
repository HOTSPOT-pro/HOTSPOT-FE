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
        aria-controls="category-select-listbox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex w-full items-center gap-4 rounded-md p-8 text-[0.8rem] font-semibold text-black"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span>{selectedLabel}</span>
        <ArrowDownIcon
          className={`h-24 w-24 text-black transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul
          className="elevation-3 absolute mt-[-2.9rem] z-dropdown max-h-72 w-full overflow-auto rounded-md border border-gray-200 bg-white py-8"
          id="category-select-listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value}>
                <button
                  aria-pressed={isSelected}
                  className={`w-full p-8 text-left text-[0.8rem] hover:bg-gray-50 ${
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
