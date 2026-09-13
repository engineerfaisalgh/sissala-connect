import Joi from 'joi';

export const registrationSchema = Joi.object({
  full_name: Joi.string().required().min(2).max(255),
  phone: Joi.string().required().regex(/^[0-9+\-\s()]+$/),
  whatsapp_number: Joi.string().optional().regex(/^[0-9+\-\s()]+$/),
  password: Joi.string().required().min(8).max(128),
  confirm_password: Joi.string().required().valid(Joi.ref('password')),
  raw_community_name: Joi.string().required().max(255),
  profile_photo: Joi.object().optional(),
  terms_accepted: Joi.boolean().required().valid(true),
  privacy_accepted: Joi.boolean().required().valid(true),
});

export const loginSchema = Joi.object({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

export const otpVerificationSchema = Joi.object({
  phone: Joi.string().required(),
  otp: Joi.string().required().length(6),
});

export const jobCreationSchema = Joi.object({
  title: Joi.string().required().max(255),
  description: Joi.string().required(),
  profession: Joi.string().required(),
  community: Joi.string().required(),
  budget_min: Joi.number().required().positive(),
  budget_max: Joi.number().required().positive().min(Joi.ref('budget_min')),
  currency: Joi.string().required().length(3),
  deadline: Joi.date().required().greater('now'),
});

export const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, { abortEarly: false });
  if (error) {
    const messages = error.details.map(detail => detail.message);
    throw new Error(messages.join(', '));
  }
  return value;
};
