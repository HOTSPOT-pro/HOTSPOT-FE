import CloseCircleIcon from '@hotspot/ui/assets/icons/close-circle.svg';
import ListSettingsIcon from '@hotspot/ui/assets/icons/list-settings.svg';
import NotificationIcon from '@hotspot/ui/assets/icons/notification.svg';
import PhoneIcon from '@hotspot/ui/assets/icons/phone.svg';
import SettingsIcon from '@hotspot/ui/assets/icons/settings.svg';
import ShareBoxIcon from '@hotspot/ui/assets/icons/share-box.svg';
import ShoppingBagIcon from '@hotspot/ui/assets/icons/shopping-bag.svg';
import type { ComponentType, SVGProps } from 'react';
import { ROUTES } from '@/shared/constants/routes';

export type MenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface MyPageMenuItem {
  icon: MenuIcon;
  id: string;
  label: string;
  path: string;
}

export interface MyPageMenuSection {
  id: string;
  items: MyPageMenuItem[];
  title: string;
}

export const MY_PAGE_MENU_SECTIONS: MyPageMenuSection[] = [
  {
    id: 'manage',
    items: [
      { icon: SettingsIcon, id: 'family', label: '우리 가족', path: ROUTES.FAMILY },
      { icon: ListSettingsIcon, id: 'family-policy', label: '가족 정책', path: ROUTES.ME_POLICY },
    ],
    title: '관리',
  },
  {
    id: 'general',
    items: [
      {
        icon: NotificationIcon,
        id: 'notification',
        label: '알림 설정',
        path: ROUTES.NOTIFICATION.SETTINGS,
      },
      { icon: ShoppingBagIcon, id: 'gift-data', label: '데이터 선물하기', path: ROUTES.GIFT },
    ],
    title: '일반',
  },
  {
    id: 'service',
    items: [
      { icon: ShareBoxIcon, id: 'logout', label: '로그아웃', path: ROUTES.LOGIN },
      { icon: CloseCircleIcon, id: 'withdraw', label: '회원탈퇴', path: ROUTES.ME_POLICY },
    ],
    title: '서비스 이용',
  },
];
