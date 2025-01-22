import InvariantError from '../../exception/InvariantError.js';
import {
  createProjectSchema,
  updateProjectSchema,
} from './schema.js';

const projectValidator = {
  validateProjectPayload: (payload) => {
    const validationResult = createProjectSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateProjectUpdatePayload: (payload) => {
    const validationResult = updateProjectSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default projectValidator;