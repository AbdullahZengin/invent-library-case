import Joi from "joi";

export const createUserSchema = Joi.object().keys({
    name: Joi.string().max(255).required(),
});
