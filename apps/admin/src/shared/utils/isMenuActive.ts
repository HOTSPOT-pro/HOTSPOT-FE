import type { AppSideBarMenuItem } from '@/shared/constants/menu';

export const isMenuActive = (pathname: string, menu: AppSideBarMenuItem): boolean => {
  return pathname === menu.path || pathname.startsWith(`${menu.path}/`);
};
