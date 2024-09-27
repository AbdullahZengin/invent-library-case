import Joi from "joi";

export const returnBookParamSchema = Joi.object().keys({
    userId: Joi.number().integer().positive().required(),
    bookId: Joi.number().integer().positive().required(),
});

export const returnBookBodySchema = Joi.object()
    .keys({
        score: Joi.number().integer().min(1).max(10).optional(),
    })
    .optional();
