import { StatusCodes } from "http-status-codes";
import { handleCatchAsyncMiddleware } from "../../../common/middlewares/handle-catch-async.middleware";
import { Request, Response } from "express";

export const getBooks = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        res.status(StatusCodes.OK).json([
            { name: "John Doe" },
            { name: "Jane Doe" },
        ]);
    }
);

export const createBook = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        res.status(StatusCodes.CREATED).json(req.body);
    }
);
