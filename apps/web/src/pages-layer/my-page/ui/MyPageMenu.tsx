'use client';

import { useModal } from '@hotspot/ui';
import { useCallback } from 'react';
import type { UserRole } from '@/domains/user/model/types';
import { MY_PAGE_MENU_SECTIONS } from '../model/constants';
import { MyPageRow } from './MyPageRow';

export const MyPageMenu = ({ familyRole }: { familyRole: UserRole | null }) => {
  const { open } = useModal();

  const handleLogoutClick = useCallback(() => {
    open('logoutConfirmModal');
  }, [open]);

  const visibleSections = MY_PAGE_MENU_SECTIONS.filter(
    (section) => !(familyRole === 'PARENT' && section.id === 'manage'),
  );

  return (
    <div className="flex flex-col w-full mt-4 space-y-8">
      {visibleSections.map((section) => (
        <div key={section.id}>
          <h2 className="mb-2 text-[0.875rem] font-semibold leading-tight text-gray-500">
            {section.title}
          </h2>
          <div>
            {section.items.map((item) => (
              <MyPageRow
                href={item.href}
                icon={item.icon}
                key={item.id}
                label={item.label}
                onClick={item.id === 'logout' ? handleLogoutClick : undefined}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
