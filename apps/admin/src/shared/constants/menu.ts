import { ROUTES } from '@/shared/constants/routes';

type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface AppSideBarMenuItem {
  id: string;
  label: string;
  path: RoutePath;
}

export const MENU_ITEMS: AppSideBarMenuItem[] = [
  { id: 'family', label: '가족 조회', path: ROUTES.FAMILY_INQUIRY },
  { id: 'policy', label: '정책 관리', path: ROUTES.POLICY_MANAGEMENT },
  { id: 'member-manage', label: '구성원 추가·삭제', path: ROUTES.FAMILY_MEMBER_MANAGEMENT },
  { id: 'family-create', label: '가족 생성', path: ROUTES.FAMILY_CREATE },
];
