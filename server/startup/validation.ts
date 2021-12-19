import { CustomHelpers, extend, Extension } from "joi";
import { Types } from "mongoose";
const OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

// Add Object ID validation with joi
const joiObjectIdExtension: Extension = {
  type: "objectId",
  messages: {
    "objectId.base": "Should be proper objectId format",
    "objectId.empty": "Empty value is not objectId",
  },
  coerce(value: string, helpers: CustomHelpers) {
    if (Types.ObjectId.isValid(value) && OBJECT_ID_REGEX.test(value)) {
      return { value: new Types.ObjectId(value) };
    }

    if (!value) {
      return { value, errors: [helpers.error("objectId.empty")] };
    }

    return { value, errors: [helpers.error("objectId.base")] };
  },
};

export const extendJoiValidation = extend(joiObjectIdExtension);
