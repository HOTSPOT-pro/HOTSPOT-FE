import ErrorWarningIcon from '@hotspot/ui/assets/icons/error-warning.svg';
import LockIcon from '@hotspot/ui/assets/icons/lock.svg';
import ShoppingBagIcon from '@hotspot/ui/assets/icons/shopping-bag.svg';
import WifiIcon from '@hotspot/ui/assets/icons/wifi.svg';

export const NOTIFICATION_SETTINGS = [
  { Icon: WifiIcon, id: 'threshold', label: '데이터 임계치 알림' },
  { Icon: LockIcon, id: 'family-policy', label: '가족 정책 적용/해제 시 알림' },
  { Icon: ErrorWarningIcon, id: 'service-block', label: '앱 서비스 차단 적용/해제 시 알림' },
  { Icon: ShoppingBagIcon, id: 'gift-data', label: '선물받은 데이터 알림' },
] as const;
