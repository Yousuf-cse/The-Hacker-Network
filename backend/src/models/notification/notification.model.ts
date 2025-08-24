import { model } from "mongoose";
import notificationSchema from "../schemaDefinations/appNotification.schema";
import { IAppNotification } from "../../@types/interface/appNotification.interface";

const Notification_Bucket = model<IAppNotification>(
  "notifications",
  notificationSchema
);

export default Notification_Bucket;
