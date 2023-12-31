import Joi from "joi";

export const schemaTransaction = Joi.object({
    value: Joi.number().positive().precision(2).required(),
    description: Joi.string().max(20).required()
  });