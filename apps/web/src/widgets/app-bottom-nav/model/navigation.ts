import BarChart from '@hotspot/ui/assets/icons/graph-bar.svg';
import BarChartSolid from '@hotspot/ui/assets/icons/graph-bar-fill.svg';
import HomeSolid from '@hotspot/ui/assets/icons/home-fill.svg';
import Home from '@hotspot/ui/assets/icons/home-line.svg';
import ReportSolid from '@hotspot/ui/assets/icons/report-fill.svg';
import Report from '@hotspot/ui/assets/icons/report-line.svg';
import SmileSolid from '@hotspot/ui/assets/icons/smile-fill.svg';
import Smile from '@hotspot/ui/assets/icons/smile-line.svg';
import UserSolid from '@hotspot/ui/assets/icons/user-fill.svg';
import User from '@hotspot/ui/assets/icons/user-line.svg';
import { ROUTES } from '@/shared/constants/routes';
import { NAV_LABELS } from '../constants/navLabel';

export const BOTTOM_NAV_ITEMS = [
  { activeIcon: HomeSolid, href: ROUTES.MY_STATUS, icon: Home, label: NAV_LABELS.MY_STATUS },
  {
    activeIcon: SmileSolid,
    href: ROUTES.FAMILY_STATUS,
    icon: Smile,
    label: NAV_LABELS.FAMILY_STATUS,
  },
  {
    activeIcon: BarChartSolid,
    href: ROUTES.ANALYZE,
    icon: BarChart,
    label: NAV_LABELS.ANALYZE,
  },
  { activeIcon: ReportSolid, href: ROUTES.REPORT, icon: Report, label: NAV_LABELS.REPORT },
  { activeIcon: UserSolid, href: ROUTES.MY_PAGE, icon: User, label: NAV_LABELS.MY_PAGE },
] as const;
