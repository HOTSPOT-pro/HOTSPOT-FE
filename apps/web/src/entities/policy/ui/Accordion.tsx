'use  client';
import { useState } from 'react';

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  showArrow?: boolean;
}

import DownArrow from '@hotspot/ui/assets/icons/arrow-down.svg';

export const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl bg-gray-100">
      <div className="w-full flex items-stretch bg-gray-50transition-all">
        <button
          className="flex-1 flex items-center outline-none"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <div className="w-full">{title}</div>
          <div
            className={`w-4.5 h-4.5 mr-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <DownArrow className="text-gray-600" />
          </div>
        </button>
      </div>

      {isOpen && <div className="flex flex-col gap-1.5 px-3 pb-3">{children}</div>}
    </div>
  );
};
