import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/errors/api.error.js";
import { Request, Response, NextFunction } from "express";

/**
 *  Middleware function that handles global errors.
 * If the error is an instance of ApiError, it will return the appropriate status code and error message.
 * Otherwise, it will return a 500 Internal Server Error status code and a generic error message.
 *
 * @returns Express Response object with the appropriate status code and error message.
 *
 */
export const handleGlobalErrorMiddleware = (
    err: ApiError | unknown,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    let error = err;
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong!";

    if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    // if (process.env.NODE_ENV === "development") {
    //     console.error(error);
    // }

    res.status(statusCode).json({ statusCode, message });
};
