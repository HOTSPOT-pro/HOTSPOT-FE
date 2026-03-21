'use client';
import type { ReactNode } from 'react';
import { useCallback, useState } from 'react';

interface AccordionProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}

import DownArrow from '@hotspot/ui/assets/icons/arrow-down.svg';

export const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="rounded-2xl bg-gray-100">
      <div className="w-full flex items-stretch transition-all">
        <button
          className="flex-1 flex items-center outline-none"
          onClick={handleToggle}
          type="button"
        >
          <div className="w-full">{title}</div>
          <div
            className={`w-20 h-20 mr-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <DownArrow className="text-gray-600" />
          </div>
        </button>
      </div>

      {isOpen && <div className="flex flex-col gap-8 px-12 pb-12">{children}</div>}
    </div>
  );
};
