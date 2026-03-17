'use client';

import { Logo } from '@hotspot/ui';
import LeftIcon from '@hotspot/ui/assets/icons/arrow-left.svg';

export interface SideBarMenuItem {
  id: string;
  label: string;
  path: string;
  isActive?: boolean;
}

interface SideBarProps {
  menuItems: ReadonlyArray<SideBarMenuItem>;
  onClose?: () => void;
  onMenuClick?: (path: string) => void;
}

export const SideBar = ({ menuItems, onClose, onMenuClick }: SideBarProps) => {
  return (
    <aside className="flex min-h-screen w-75 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex h-14.5 items-center justify-between pl-16 pr-8">
        <div className="flex h-full items-center justify-center gap-8">
          <Logo size="xs" />
          <strong className="text-[18px] leading-none font-semibold text-black">Hotspot</strong>
        </div>
        <button
          aria-label="사이드 메뉴 접기"
          className="flex h-40 w-40 items-center justify-center rounded-md hover:bg-gray-100"
          onClick={onClose}
          type="button"
        >
          <LeftIcon />
        </button>
      </div>

      <div className="flex-1 p-16">
        <nav className="flex flex-col gap-1">
          {menuItems.map((menu) => {
            return (
              <button
                className={`flex items-center rounded-[8px] px-12 py-8 text-[1rem] transition-colors ${
                  menu.isActive
                    ? 'bg-purple-100 font-medium text-purple-700'
                    : 'text-black hover:bg-gray-100'
                }`}
                key={menu.id}
                onClick={() => onMenuClick?.(menu.path)}
                type="button"
              >
                {menu.label}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
