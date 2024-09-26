import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors/api.error.js";
import { StatusCodes } from "http-status-codes";
import { validateOptions } from "../config/validation-options.js";

/**
 *  Parse request params middleware function that validates the request params against a Joi schema.
 *
 * @param schema - Joi schema object to validate the request params against.
 * @returns Express middleware function that parses the request params. If the request params are invalid, it will return a 400 Bad Request error. Otherwise, it will call the next middleware function.
 *
 */
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
