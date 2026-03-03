export interface Notification {
  id: number;
  eventId: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  type: string;
}
