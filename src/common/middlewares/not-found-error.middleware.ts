import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/errors/api.error.js";

/**
 *  Middleware function that handles 404 Not Found errors.
 *
 * @returns Calls the next middleware function with a 404 Not Found error.
 *
 */
export const notFoundErrorMiddleware = (
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    const error = new ApiError(StatusCodes.NOT_FOUND, "Not found");
    next(error);
};
