import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/errors/api.error.js";
import { StatusCodes } from "http-status-codes";
import { validateOptions } from "../config/validation-options.js";

/**
 *  Parse request body middleware function that validates the request body against a Joi schema.
 *
 * @param schema - Joi schema object to validate the request body against.
 * @returns Express middleware function that parses the request body. If the request body is invalid, it will return a 400 Bad Request error. Otherwise, it will call the next middleware function.
 *
 */
export const parseRequestBodyMiddleware =
    (schema: Joi.ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const payload = req.body;

        const { error, value } = schema
            .strict()
            .validate(payload, validateOptions);

        if (error) {
            const errorMessage = error.details
                .map((details: Joi.ValidationErrorItem) => details.message)
                .join(", ");

            return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage));
        }

        req.body = value;

        return next();
    };
