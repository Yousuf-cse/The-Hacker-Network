import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface IChat {
  _id: string;
  participants: IUser[];
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  lastMessage?: IMessage;
}
