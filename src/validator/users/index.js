import InvariantError from '../../exception/InvariantError.js';
import {
  userPayloadSchema,
  userUpdatePayloadSchema,
} from './schema.js';

const userValidator = {
  validateUserPayload: (payload) => {
    const validationResult = userPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateUserUpdatePayload: (payload) => {
    const validationResult = userUpdatePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default userValidator;