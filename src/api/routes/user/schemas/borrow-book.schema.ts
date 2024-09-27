import Joi from "joi";

export const borrowBookSchema = Joi.object().keys({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
});
