import Joi from "joi";

export const noteSchema = Joi.object({
  title: Joi.string().required().min(3).max(30),
  content: Joi.string().required().min(10).max(5000),
});
