import Home from '@/shared/assets/icons/Home.svg';
import HomeSolid from '@/shared/assets/icons/HomeSolid.svg';
import Report from '@/shared/assets/icons/Report.svg';
import ReportSolid from '@/shared/assets/icons/ReportSolid.svg';
import Smile from '@/shared/assets/icons/Smile.svg';
import SmileSolid from '@/shared/assets/icons/SmileSolid.svg';
import User from '@/shared/assets/icons/User.svg';
import UserSolid from '@/shared/assets/icons/UserSolid.svg';

export const BOTTOM_NAV_ITEMS = [
  { activeIcon: HomeSolid, href: '/family', icon: Home, label: '가족 현황' },
  { activeIcon: SmileSolid, href: '/me', icon: Smile, label: '내 현황' },
  { activeIcon: ReportSolid, href: '/reports', icon: Report, label: '리포트' },
  { activeIcon: UserSolid, href: '/my', icon: User, label: '마이' },
] as const;
