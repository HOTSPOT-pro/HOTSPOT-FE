import ErrorWarningIcon from '@hotspot/ui/assets/icons/error-warning.svg';
import LockIcon from '@hotspot/ui/assets/icons/lock.svg';
import ShoppingBagIcon from '@hotspot/ui/assets/icons/shopping-bag.svg';
import WifiIcon from '@hotspot/ui/assets/icons/wifi.svg';

export const NOTIFICATION_SETTINGS = [
  {
    description: '데이터 잔여율이 50%, 30%, 10%, 0%에 도달했을 경우에 알림이 옵니다.',
    icon: WifiIcon,
    id: 'DATA',
    label: '데이터 임계치 알림',
  },
  { description: '', icon: LockIcon, id: 'POLICY', label: '가족 정책 적용/해제 시 알림' },
  {
    description: '',
    icon: ErrorWarningIcon,
    id: 'APP_SERVICE',
    label: '앱 서비스 차단 적용/해제 시 알림',
  },
  { description: '', icon: ShoppingBagIcon, id: 'PRESENT', label: '선물받은 데이터 알림' },
] as const;
