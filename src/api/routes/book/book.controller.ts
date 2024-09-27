import { StatusCodes } from "http-status-codes";
import { handleCatchAsyncMiddleware } from "../../../common/middlewares/handle-catch-async.middleware";
import { Request, Response } from "express";
import bookService from "./book.service";

/**
 * Controller function that gets all books.
 *
 */
export const getBooks = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        const data = await bookService.getAll();

        res.status(StatusCodes.OK).json(data);
    }
);

/**
 * Controller function that gets a book by ID.
 *
 */
export const getBookByIdWithScore = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const book = await bookService.getByIdWithScore(Number(id));

        res.status(StatusCodes.OK).json(book);
    }
);

/**
 * Controller function that creates a book.
 *
 */
export const createBook = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        const { name } = req.body;
        await bookService.create(name);

        res.status(StatusCodes.CREATED).send();
    }
);
