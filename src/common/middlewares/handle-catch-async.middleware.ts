import { Request, Response, NextFunction, RequestHandler } from "express";

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
