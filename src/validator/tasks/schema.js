import Joi from 'joi';

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required()
    .messages({
      'string.empty': 'Task title is required',
      'string.min': 'Task title must be at least 3 characters long',
      'string.max': 'Task title must not exceed 100 characters',
    }),
  description: Joi.string().max(500).allow(null, '')
    .messages({
      'string.max': 'Description must not exceed 500 characters',
    }),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED').default('PENDING')
    .messages({
      'string.empty': 'Status is required',
      'any.only': 'Status must be one of "PENDING", "IN_PROGRESS", or "COMPLETED"',
    }),
  dueDate: Joi.date().iso().allow(null)
    .messages({
      'date.base': 'Due date must be a valid date',
      'date.iso': 'Due date must be in ISO 8601 format',
    }),
  userId: Joi.string().required()
    .messages({
      'string.empty': 'User ID is required',
    }),
  projectId: Joi.string().required()
    .messages({
      'string.empty': 'Project ID is required',
    }),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100)
    .messages({
      'string.min': 'Task title must be at least 3 characters long',
      'string.max': 'Task title must not exceed 100 characters',
    }),
  description: Joi.string().max(500).allow(null, '')
    .messages({
      'string.max': 'Description must not exceed 500 characters',
    }),
  status: Joi.string().valid('PENDING', 'IN_PROGRESS', 'COMPLETED')
    .messages({
      'any.only': 'Status must be one of "PENDING", "IN_PROGRESS", or "COMPLETED"',
    }),
  dueDate: Joi.date().iso().allow(null)
    .messages({
      'date.base': 'Due date must be a valid date',
      'date.iso': 'Due date must be in ISO 8601 format',
    }),
  userId: Joi.string()
    .messages({
      'string.empty': 'User ID is required',
    }),
  projectId: Joi.string()
    .messages({
      'string.empty': 'Project ID is required',
    }),
}).min(1).messages({
  'object.min': 'At least one field must be updated',
});

export {
  createTaskSchema,
  updateTaskSchema,
};
