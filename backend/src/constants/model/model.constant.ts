import { SchemaDefinitionProperty, Types } from "mongoose";

const requiredString: SchemaDefinitionProperty = {
  type: String,
  required: true,
};

const optionalNullString: SchemaDefinitionProperty = {
  type: null,
  required: false,
};

const requiredBoolean: SchemaDefinitionProperty = {
  type: Boolean,
  required: true,
};

const optionalBoolean: SchemaDefinitionProperty = {
  type: Boolean,
  required: false,
};

const requiredNumber: SchemaDefinitionProperty = {
  type: Number,
  required: true,
};

const optionalNumber: SchemaDefinitionProperty = {
  type: Number,
  required: false,
  default: 0,
};

const requiredObjectId: SchemaDefinitionProperty = {
  type: Types.ObjectId,
  required: true,
};

const optionalObjectId: SchemaDefinitionProperty = {
  type: Types.ObjectId,
  required: false,
};

const requiredArrayOfObjectId: SchemaDefinitionProperty = {
  type: [Types.ObjectId],
  required: true,
};

const requiredDate: SchemaDefinitionProperty = {
  type: Date,
  required: true,
};

const optionalDate: SchemaDefinitionProperty = {
  type: Date,
  required: false,
};

const SCHEMA_DEFINATION_PROPERTY = {
  requiredString,
  optionalNullString,
  requiredBoolean,
  optionalBoolean,
  requiredNumber,
  optionalNumber,
  requiredObjectId,
  optionalObjectId,
  requiredDate,
  optionalDate,
  requiredArrayOfObjectId,
};

export default SCHEMA_DEFINATION_PROPERTY;
