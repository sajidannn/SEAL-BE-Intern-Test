import Joi from 'joi';

const userPayloadSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 8 characters',
  }),
  avatar: Joi.object({
    originalname: Joi.string().required().messages({
      'string.empty': 'Avatar file name is required',
    }),
    mimetype: Joi.string()
      .valid('image/png', 'image/jpg', 'image/jpeg', 'image/webp')
      .required()
      .messages({
        'any.only': 'Avatar must be in PNG, JPG, JPEG, or WEBP format',
        'string.empty': 'Avatar file type is required',
      }),
    size: Joi.number()
      .max(2 * 1024 * 1024) // Maksimum 2 MB
      .required()
      .messages({
        'number.base': 'Avatar file size must be a number',
        'number.max': 'Avatar file size cannot exceed 2 MB',
      }),
  })
    .unknown()
    .required()
    .messages({
      'object.base': 'Avatar is required and must be an object',
    }),
});

const userUpdatePayloadSchema = Joi.object({
  name: Joi.string().min(3).max(100).messages({
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name cannot exceed 100 characters',
  }),
  avatar: Joi.object({
    originalname: Joi.string().required().messages({
      'string.empty': 'Avatar file name is required',
    }),
    mimetype: Joi.string()
      .valid('image/png', 'image/jpg', 'image/jpeg', 'image/webp')
      .required()
      .messages({
        'any.only': 'Avatar must be in PNG, JPG, JPEG, or WEBP format',
        'string.empty': 'Avatar file type is required',
      }),
    size: Joi.number()
      .max(2 * 1024 * 1024) // Maksimum 2 MB
      .required()
      .messages({
        'number.base': 'Avatar file size must be a number',
        'number.max': 'Avatar file size cannot exceed 2 MB',
      }),
  })
    .unknown()
});

export { userPayloadSchema, userUpdatePayloadSchema };
