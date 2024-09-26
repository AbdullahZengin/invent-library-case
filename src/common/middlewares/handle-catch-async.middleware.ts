import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 *  Middleware function that handles async errors.
 * If the async function throws an error, it will call the next middleware function with the error.
 *
 * @param fn - Async function that may throw an error.
 * @returns Express middleware function that handles async errors.
 *
 */
export const handleCatchAsyncMiddleware = (
    fn: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<void> | void
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((error: unknown) =>
            next(error)
        );
    };
};
