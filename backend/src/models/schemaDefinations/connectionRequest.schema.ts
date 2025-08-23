import { Schema } from "mongoose";
import {
  IConnectionRequest,
  IConnectionStatus,
} from "../../@types/interface/connectionRequest.interface";
import SCHEMA_DEFINATION_PROPERTY from "../../constants/model/model.constant";

const connectionRequestSchema = new Schema<IConnectionRequest>({
  from_user_objectId: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
  to_user_objectId: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
  status: {
    ...SCHEMA_DEFINATION_PROPERTY,
    enum: ["Accepted", "Pending", "Cancel"] as IConnectionStatus[],
  },
});

export default connectionRequestSchema;
