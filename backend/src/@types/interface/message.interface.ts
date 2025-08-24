import { IUser } from "./user.interface";

export interface IMessage {
  chat: string;
  sender: IUser;
  content: string;
  timestamp: Date;
  seenBy: string[];
}
