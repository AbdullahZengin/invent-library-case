import Joi from "joi";

export const createBookSchema = Joi.object().keys({
    name: Joi.string().max(255).required(),
});
