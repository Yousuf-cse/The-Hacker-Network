import { Schema } from "mongoose";
import { IMessage } from "../../@types/interface/message.interface";
import SCHEMA_DEFINATION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOptions";

const messageSchema = new Schema<IMessage>(
  {
    chat: SCHEMA_DEFINATION_PROPERTY.requiredString,
    sender: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
    content: SCHEMA_DEFINATION_PROPERTY.requiredString,
    seenBy: SCHEMA_DEFINATION_PROPERTY.requiredArrayOfObjectId,
  },
  GENERAL_SCHEMA_OPTIONS
);

export default messageSchema;
