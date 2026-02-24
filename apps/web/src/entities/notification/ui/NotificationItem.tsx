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
        'w-full flex flex-col gap-1 p-4 transition-colors cursor-pointer items-start rounded',
        isRead ? 'bg-white' : 'bg-purple-100',
        className,
      )}
      onClick={() => onClick?.(id)}
      type="button"
    >
      <h4 className={cn('text-sm font-semibold pr-4', isRead ? 'text-gray-600' : 'text-gray-900')}>
        {message ?? renderMessage()}
      </h4>
      <span className="text-xs text-gray-400 mt-1">{createdAt}</span>
    </button>
  );
};
