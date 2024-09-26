import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors/api.error.js";
import { StatusCodes } from "http-status-codes";
import { validateOptions } from "../config/validation-options.js";

/**
 *  Parse request query string middleware function that validates the request query string against a Joi schema.
 *
 * @param schema - Joi schema object to validate the request query string against.
 * @returns Express middleware function that parses the request query string. If the request query string is invalid, it will return a 400 Bad Request error. Otherwise, it will call the next middleware function.
 *
 */
export const parseRequestQueryStringMiddleware =
    (schema: Joi.ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const payload = req.query;
        const { error, value } = schema.validate(payload, validateOptions);

        if (error) {
            const errorMessage = error.details
                .map((details: Joi.ValidationErrorItem) => details.message)
                .join(", ");
            return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
        }

        req.query = value;
        return next();
    };
