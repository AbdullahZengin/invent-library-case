import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/errors/api.error.js";

export const notFoundErrorMiddleware = (
    _req: Request,
    _res: Response,
    next: NextFunction
) => {
    const error = new ApiError(StatusCodes.NOT_FOUND, "Not found");
    next(error);
};
