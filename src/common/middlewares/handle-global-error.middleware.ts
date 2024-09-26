import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/errors/api.error.js";
import { Request, Response, NextFunction } from "express";

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
