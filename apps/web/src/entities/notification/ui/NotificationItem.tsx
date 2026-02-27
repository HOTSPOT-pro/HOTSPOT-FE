import WarningIcon from '@hotspot/ui/assets/icons/warning.svg';
import { cn } from '@hotspot/ui/lib';
import { NOTIFICATION_MESSAGES, type Notification } from '../model/type';

interface NotificationItemProps {
  notification: Notification;
  onClick?: (id: string) => void;
  className?: string;
}

export const NotificationItem = ({ notification, onClick, className }: NotificationItemProps) => {
  const { id, metadata, type, message, createdAt, isRead } = notification;

  const renderMessage = () => {
    const messageFn = NOTIFICATION_MESSAGES[type];
    return messageFn ? messageFn(metadata) : '알 수 없는 알림입니다.';
  };

  return (
    <button
      className={cn(
        'flex flex-row gap-4 p-4 transition-colors cursor-pointer',
        isRead ? 'bg-white' : 'bg-purple-100',
        className,
      )}
      onClick={() => onClick?.(id)}
      type="button"
    >
      <WarningIcon className="w-5 h-5 text-purple-600" />
      <div className="w-full flex flex-col gap-1 items-start">
        <p className={cn('text-sm font-medium text-black')}>{message ?? renderMessage()}</p>
        <p className="text-gray-600 font-normal text-xs">description</p>
        <span className="text-[10px] text-gray-500 mt-1">{createdAt}</span>
      </div>
    </button>
  );
};
