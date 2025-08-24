import { Schema } from "mongoose";
import { IAppNotification } from "../../@types/interface/appNotification.interface";
import SCHEMA_DEFINATION_PROPERTY from "../../constants/model/model.constant";

const notificationSchema = new Schema<IAppNotification>({
  sender_object_id: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
  reciever_object_id: SCHEMA_DEFINATION_PROPERTY.requiredObjectId,
  message: SCHEMA_DEFINATION_PROPERTY.requiredString,
  action: SCHEMA_DEFINATION_PROPERTY.optionalNullString,
});

export default notificationSchema;
