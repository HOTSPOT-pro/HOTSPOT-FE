import DownArrowIcon from '@hotspot/ui/assets/icons/arrow-down.svg';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  label: string;
  items: { label: string; onClick: () => void }[];
}

export const Dropdown = ({ label, items }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    /* 1. 부모는 딱 버튼 내용만큼만 너비를 가집니다 */
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        /* 2. 버튼은 부모(w-fit) 너비를 100% 채웁니다 */
        className="flex w-full justify-between items-center rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-[12px] font-normal text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 gap-2"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {label}
        <DownArrowIcon className="text-gray-500 w-4 h-4" />
      </button>

      {isOpen && (
        /* 3. absolute 리스트에 w-full을 주면 정확히 '버튼 너비'만큼만 생깁니다 */
        <div className="absolute left-0 mt-2 w-full min-w-max rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 origin-top">
          <div className="py-1">
            {items.map((item, index) => (
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 whitespace-nowrap"
                key={index}
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
