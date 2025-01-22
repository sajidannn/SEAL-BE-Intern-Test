import InvariantError from '../../exception/InvariantError.js';
import {
  createTaskSchema,
  updateTaskSchema
} from './schema.js';

const taskValidator = {
  validateTaskPayload: (payload) => {
    const validationResult = createTaskSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateTaskUpdatePayload: (payload) => {
    const validationResult = updateTaskSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default taskValidator;