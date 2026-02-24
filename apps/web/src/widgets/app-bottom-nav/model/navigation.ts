import HomeSolid from '@/shared/assets/icons/home-fill.svg';
import Home from '@/shared/assets/icons/home-line.svg';
import ReportSolid from '@/shared/assets/icons/report-fill.svg';
import Report from '@/shared/assets/icons/report-line.svg';
import SmileSolid from '@/shared/assets/icons/smile-fill.svg';
import Smile from '@/shared/assets/icons/smile-line.svg';
import UserSolid from '@/shared/assets/icons/user-fill.svg';
import User from '@/shared/assets/icons/user-line.svg';
import { ROUTES } from '@/shared/constants/routes';
import { NAV_LABELS } from '../constants/navLabel';

export const BOTTOM_NAV_ITEMS = [
  { activeIcon: HomeSolid, href: ROUTES.FAMILYSTATUS, icon: Home, label: NAV_LABELS.FAMILY_STATUS },
  { activeIcon: SmileSolid, href: ROUTES.MYSTATUS, icon: Smile, label: NAV_LABELS.MY_STATUS },
  { activeIcon: ReportSolid, href: ROUTES.REPORT, icon: Report, label: NAV_LABELS.REPORT },
  { activeIcon: UserSolid, href: ROUTES.MYPAGE, icon: User, label: NAV_LABELS.MY_PAGE },
] as const;
