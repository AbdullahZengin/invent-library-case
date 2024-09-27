import Joi from "joi";

export const getBookByIdSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
});
