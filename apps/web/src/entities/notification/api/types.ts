export interface GetNotificationResponse {
  notifications: Notification[];
  page: number;
  size: number;
  hasNext: boolean;
}
export interface Notification {
  id: number;
  eventId: string;
  notificationType: string;
  title: string;
  content: string;
  isRead: boolean;
  createdTime: string;
}
