import { Schema } from "mongoose";
import { ExLevel, IUser } from "../../@types/interface/user.interface";
import SCHEMA_DEFINATION_PROPERTY from "../../constants/model/model.constant";
import { GENERAL_SCHEMA_OPTIONS } from "../../constants/model/schemaOptions";

const userSchema = new Schema<IUser>(
  {
    full_name: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    age: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredNumber,
      min: 0,
      max: 120,
    },
    avatar: {
      ...SCHEMA_DEFINATION_PROPERTY.optionalNullString,
      validate: {
        validator: (v: string) =>
          /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v),
        message: "Invalid avatar URL format",
      },
    },
    email: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: "Invalid email format",
      },
    },
    password: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      min: 8,
      max: 16,
    },
    phone_number: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      unique: true,
    },
    address: {
      street: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
      city: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
      state: SCHEMA_DEFINATION_PROPERTY.requiredString,
      postalCode: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        validate: {
          validator: (v: string) => /^\d{4,10}$/.test(v),
          message: "Invalid postal code format",
        },
      },
      country: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
      landmark: SCHEMA_DEFINATION_PROPERTY.requiredString,
    },
    education: {
      college_name: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
      year_of_study: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredNumber,
        min: 1,
        max: 10,
      },
      department: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
    },
    skills: {
      technical: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
      non_technical: {
        ...SCHEMA_DEFINATION_PROPERTY.requiredString,
        trim: true,
      },
    },
    experience_level: {
      ...SCHEMA_DEFINATION_PROPERTY.requiredString,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"] as ExLevel[],
    },
  },
  GENERAL_SCHEMA_OPTIONS
);

export default userSchema;
