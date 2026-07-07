import { model } from "mongoose";
import { IMessage } from "../../@types/interface/message.interface";
import messageSchema from "../schemaDefinations/messages.schema";

const Message_Bucket = model<IMessage>("messages", messageSchema);

export default Message_Bucket;
