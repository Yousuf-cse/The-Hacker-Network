import { model } from "mongoose";
import connectionRequestSchema from "../schemaDefinations/connectionRequest.schema";
import { IConnectionRequest } from "../../@types/interface/connectionRequest.interface";

const ConnectionRequest = model<IConnectionRequest>(
  "connection_requests",
  connectionRequestSchema
);

export default ConnectionRequest;
