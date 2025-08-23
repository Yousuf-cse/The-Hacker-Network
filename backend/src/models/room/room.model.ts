import { model } from "mongoose";
import roomSchema from "../schemaDefinations/room.schema";
import { IRoom } from "../../@types/interface/room.interface";

const HackerHouse = model<IRoom>("hacker_rooms", roomSchema);

export default HackerHouse;
