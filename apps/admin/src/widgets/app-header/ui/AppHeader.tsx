'use client';

import { usePathname } from 'next/navigation';
import { Header, MENU_ITEMS } from '@/shared';

interface AppHeaderProps {
  isSideBarOpen: boolean;
  onOpenSideBar: () => void;
}

export const AppHeader = ({ isSideBarOpen, onOpenSideBar }: AppHeaderProps) => {
  const pathname = usePathname();

  const currentMenu = MENU_ITEMS.find(
    (item) => pathname === item.path || pathname.startsWith(`${item.path}/`),
  );

  return (
    <Header
      headerText={currentMenu?.label ?? ''}
      onOpenSideBar={onOpenSideBar}
      showOpenButton={!isSideBarOpen}
    />
  );
};
