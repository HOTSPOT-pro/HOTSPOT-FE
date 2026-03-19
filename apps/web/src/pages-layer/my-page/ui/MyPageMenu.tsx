'use client';

import { useModal } from '@hotspot/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import type { UserRole } from '@/domains/user/model/types';
import { MY_PAGE_MENU_SECTIONS } from '../model/constants';
import { MyPageRow } from './MyPageRow';

export const MyPageMenu = ({ familyRole }: { familyRole: UserRole | null }) => {
  const { open } = useModal();
  const router = useRouter();

  const handleLogoutClick = useCallback(() => {
    open('logoutConfirmModal');
  }, [open]);

  const handleWithdrawClick = useCallback(() => {
    open('withdrawConfirmModal');
  }, [open]);

  const visibleSections = MY_PAGE_MENU_SECTIONS.filter(
    (section) => !(familyRole === 'PARENT' && section.id === 'manage'),
  );

  return (
    <div className="flex flex-col w-full space-y-32">
      {visibleSections.map((section) => (
        <div key={section.id}>
          <h2 className="ml-16 mb-8 font-title-title5-medium leading-tight text-gray-500">
            {section.title}
          </h2>
          <div>
            {section.items.map((item) => {
              let onClick: () => void;

              if (item.id === 'logout') {
                onClick = handleLogoutClick;
              } else if (item.id === 'withdraw') {
                onClick = handleWithdrawClick;
              } else {
                onClick = () => {
                  router.push(item.path);
                };
              }

              return (
                <MyPageRow icon={item.icon} key={item.id} label={item.label} onClick={onClick} />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
