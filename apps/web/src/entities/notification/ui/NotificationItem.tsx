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
        'flex flex-row gap-4 p-4 transition-colors cursor-pointer items-center',
        isRead ? 'bg-white' : 'bg-purple-100',
        className,
      )}
      onClick={onClick}
      type="button"
    >
      <WarningIcon className="w-5 h-5 text-purple-600" />
      <div className="w-full flex flex-col gap-1 items-start">
        <p className={cn('text-sm font-medium text-black')}>{title}</p>
        <p className="text-gray-600 font-normal text-xs">{message}</p>
        <span className="text-[10px] text-gray-500 mt-1">{formatDate(dateObject)}</span>
      </div>
    </button>
  );
};
