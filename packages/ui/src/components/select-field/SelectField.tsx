'use client';

import { cn } from '../..';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';

interface SelectFieldProps {
  onClick: () => void;
  rightSlot?: React.ReactNode;
  heading: string;
  desc?: string;
  classname?: string;
}

export const SelectField = ({ onClick, rightSlot, heading, desc, classname }: SelectFieldProps) => {
  return (
    <button
      className={cn('flex flex-row w-full gap-3 p-3 rounded-[8px] items-center', classname)}
      onClick={onClick}
      type="button"
    >
      {rightSlot}
      <p className="flex flex-col flex-1 gap-0.5 text-left">
        <span className="text-[13px]">{heading}</span>
        <span className="text-[11px]">{desc}</span>
      </p>
      <div>
        <div className="w-5 h-5">
          <ArrowRightIcon />
        </div>
      </div>
    </button>
  );
};
