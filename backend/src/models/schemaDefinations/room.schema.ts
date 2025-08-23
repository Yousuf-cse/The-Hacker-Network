import { Schema } from "mongoose";
import { IRoom } from "../../@types/interface/room.interface";
import SCHEMA_DEFINATION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOptions";

const roomSchema = new Schema<IRoom>(
  {
    roomId: SCHEMA_DEFINATION_PROPERTY.requiredString,
    description: SCHEMA_DEFINATION_PROPERTY.requiredString,
    createdBy: SCHEMA_DEFINATION_PROPERTY.requiredString,
    members: SCHEMA_DEFINATION_PROPERTY.requiredArrayOfObjectId,
    max_members: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      min: 0,
      max: 6,
    },
    location: SCHEMA_DEFINATION_PROPERTY.requiredString,
    is_active: SCHEMA_DEFINATION_PROPERTY.requiredBoolean,
  },
  GENERAL_SCHEMA_OPTIONS
);

export default roomSchema;
