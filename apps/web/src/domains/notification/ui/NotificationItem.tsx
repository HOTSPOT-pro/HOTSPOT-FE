import WarningIcon from '@hotspot/ui/assets/icons/warning.svg';
import { cn } from '@hotspot/ui/lib';
import { formatDate } from '@/shared/lib';
import type { Notification } from '../model/type';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
  className?: string;
}

export const NotificationItem = ({ notification, onClick, className }: NotificationItemProps) => {
  const { title, message, createdAt, isRead } = notification;
  const dateObject = new Date(createdAt);

  return (
    <button
      className={cn(
        'flex flex-row gap-16 p-16 transition-colors cursor-pointer items-center',
        isRead ? 'bg-white' : 'bg-purple-100',
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <WarningIcon className="w-20 h-20 text-purple-600" />
      <p className="w-full flex flex-col gap-1 items-start text-left">
        <span className={cn('font-title-title5-medium')}>{title}</span>
        <span className="font-body-body4 break-keep text-text-secondary">{message}</span>
        <span className="font-body-body6 text-text-tertiary mt-4">{formatDate(dateObject)}</span>
      </p>
    </button>
  );
};
