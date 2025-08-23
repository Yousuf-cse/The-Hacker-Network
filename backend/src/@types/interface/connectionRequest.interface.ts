export type IConnectionStatus = "Accepted" | "Pending" | "Cancel";

export interface IConnectionRequest {
  from_user_objectId: string; // who sent the request
  to_user_objectId: string; // who will recieve request
  status: IConnectionStatus;
}
