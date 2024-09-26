import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors/api.error.js";
import { StatusCodes } from "http-status-codes";
import { validateOptions } from "../config/validation-options.js";

export const parseRequestParamsMiddleware =
    (schema: Joi.ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const payload = req.params;
        const { error, value } = schema.validate(payload, validateOptions);

        if (error) {
            const errorMessage = error.details
                .map((details: Joi.ValidationErrorItem) => details.message)
                .join(", ");
            return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
        }

        req.params = value;
        return next();
    };
