export interface NotificationModel {
  position?: string;
  type?: string;
  message?: string;
  delay?:number;
  autoClose?: boolean;
  isShow: boolean;
}
