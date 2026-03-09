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
  { id: 'member-add', label: '구성원 추가', path: ROUTES.ADD_FAMILY_MEMBER },
  { id: 'member-delete', label: '구성원 삭제', path: ROUTES.DELETE_FAMILY_MEMBER },
  { id: 'family-create', label: '가족 생성', path: ROUTES.FAMILY_CREATE },
];
