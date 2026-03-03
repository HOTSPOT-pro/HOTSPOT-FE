export interface NotificationAllowResponse {
  notificationAllows: NotificationAllow[];
}
export interface NotificationAllow {
  notificationCategory: string;
  notificationAllow: boolean;
}
