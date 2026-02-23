import HomeSolid from '@/shared/assets/icons/home-fill.svg';
import Home from '@/shared/assets/icons/home-line.svg';
import ReportSolid from '@/shared/assets/icons/report-fill.svg';
import Report from '@/shared/assets/icons/report-line.svg';
import SmileSolid from '@/shared/assets/icons/smile-fill.svg';
import Smile from '@/shared/assets/icons/smile-line.svg';
import UserSolid from '@/shared/assets/icons/user-fill.svg';
import User from '@/shared/assets/icons/user-line.svg';

export const BOTTOM_NAV_ITEMS = [
  { activeIcon: HomeSolid, href: '/family', icon: Home, label: '가족 현황' },
  { activeIcon: SmileSolid, href: '/me', icon: Smile, label: '내 현황' },
  { activeIcon: ReportSolid, href: '/report', icon: Report, label: '리포트' },
  { activeIcon: UserSolid, href: '/my', icon: User, label: '마이' },
] as const;
