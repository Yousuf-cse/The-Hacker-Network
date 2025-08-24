import { Schema } from "mongoose";
import {
  IConnectionRequest,
  IConnectionStatus,
} from "../../@types/interface/connectionRequest.interface";
import SCHEMA_DEFINATION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOptions";

const connectionRequestSchema = new Schema<IConnectionRequest>(
  {
    from_user_objectId: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
    to_user_objectId: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
    status: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      enum: ["Accepted", "Pending", "Cancel"] as IConnectionStatus[],
    },
  },
  GENERAL_SCHEMA_OPTIONS
);

export default connectionRequestSchema;
