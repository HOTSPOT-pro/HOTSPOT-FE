'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
import { cn } from '../../lib/cssMerge';

interface SelectFieldProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  heading: string;
  desc?: string;
}

export const SelectField = ({
  leftSlot,
  rightSlot,
  heading,
  desc,
  className,
  type = 'button',
  ...props
}: SelectFieldProps) => {
  return (
    <button
      className={cn('flex flex-row w-full gap-16 px-16 py-8 items-center', className)}
      type={type}
      {...props}
    >
      {leftSlot}
      <p className="flex flex-col flex-1 text-left gap-4">
        <span className="font-title-title5-medium">{heading}</span>
        {desc && <span className="font-body-body4">{desc}</span>}
      </p>
      <div className="shrink-0">
        {rightSlot ? (
          rightSlot
        ) : (
          <div className="w-24 h-24">
            <ArrowRightIcon />
          </div>
        )}
      </div>
    </button>
  );
};
