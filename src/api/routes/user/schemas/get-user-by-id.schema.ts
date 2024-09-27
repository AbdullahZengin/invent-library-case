import Joi from "joi";

export const getUserByIdSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
});
