import { model } from "mongoose";
import { IMessage } from "../../@types/interface/message.interface";

const Message_Bucket = model<IMessage>("messages");

export default Message_Bucket;
