import { StatusCodes } from "http-status-codes";
import { handleCatchAsyncMiddleware } from "../../../common/middlewares/handle-catch-async.middleware";
import { Request, Response } from "express";
import userService from "./user.service";

/**
 * Controller function that gets all users.
 */
export const getUsers = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        const data = await userService.getAll();
        res.status(StatusCodes.OK).json(data);
    }
);

/**
 * Controller function that gets a user by ID.
 */
export const getUserById = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const data = await userService.getById(parseInt(id!));
        res.status(StatusCodes.OK).json(data);
    }
);

/**
 * Controller function that creates a user.
 */
export const createUser = handleCatchAsyncMiddleware(
    async (req: Request, res: Response) => {
        const { name } = req.body;
        await userService.create(name);

        res.status(StatusCodes.CREATED).send();
    }
);
