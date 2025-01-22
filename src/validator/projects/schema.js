import Joi from 'joi';

const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required()
    .messages({
      'string.empty': 'Project name is required',
      'string.min': 'Project name must be at least 3 characters long',
      'string.max': 'Project name must not exceed 100 characters',
    }),
  description: Joi.string().max(500).allow(null, '')
    .messages({
      'string.max': 'Description must not exceed 500 characters',
    }),
  startDate: Joi.date().iso()
    .messages({
      'date.base': 'Start date must be a valid date',
      'date.iso': 'Start date must be in ISO 8601 format',
      'any.required': 'Start date is required',
    }),
  endDate: Joi.date().iso().greater(Joi.ref('startDate'))
    .messages({
      'date.base': 'End date must be a valid date',
      'date.greater': 'End date must be after the start date',
      'date.iso': 'End date must be in ISO 8601 format',
      'any.required': 'End date is required',
    }),
});

const updateProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100)
    .messages({
      'string.min': 'Project name must be at least 3 characters long',
      'string.max': 'Project name must not exceed 100 characters',
    }),
  description: Joi.string().max(500).allow(null, '')
    .messages({
      'string.max': 'Description must not exceed 500 characters',
    }),
  startDate: Joi.date().iso()
    .messages({
      'date.base': 'Start date must be a valid date',
      'date.iso': 'Start date must be in ISO 8601 format',
    }),
  endDate: Joi.date().iso().greater(Joi.ref('startDate'))
    .messages({
      'date.base': 'End date must be a valid date',
      'date.greater': 'End date must be after the start date',
      'date.iso': 'End date must be in ISO 8601 format',
    }),
}).min(1).messages({
  'object.min': 'At least one field must be updated',
});



export {
  createProjectSchema,
  updateProjectSchema,
};
