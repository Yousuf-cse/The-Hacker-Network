export interface IAppNotification {
  sender_object_id: string;
  reciever_object_id: string;
  message: string;
  action?: string;
}
