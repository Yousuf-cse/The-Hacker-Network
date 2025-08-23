import { model } from "mongoose";
import userSchema from "../schemaDefinations/user.schema";
import { IUser } from "../../@types/interface/user.interface";

const UserModel = model<IUser>("users", userSchema);

export default UserModel;
