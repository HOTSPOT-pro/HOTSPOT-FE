'use client';

import { usePathname, useRouter } from 'next/navigation';
import { isMenuActive, MENU_ITEMS, SideBar } from '@/shared';

interface AppSideBarProps {
  onClose?: () => void;
}

export const AppSideBar = ({ onClose }: AppSideBarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = MENU_ITEMS.map((item) => ({
    id: item.id,
    isActive: isMenuActive(pathname, item),
    label: item.label,
    path: item.path,
  }));

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return <SideBar menuItems={menuItems} onClose={onClose} onMenuClick={handleMenuClick} />;
};
