import Joi from "joi";

export const createUserSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(0).max(150).required(),
});
