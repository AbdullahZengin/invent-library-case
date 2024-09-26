import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { ApiError } from "./common/utils/errors/api.error.js";
import { StatusCodes } from "http-status-codes";
import { handleGlobalErrorMiddleware } from "./common/middlewares/handle-global-error.middleware.js";
import { handleCatchAsyncMiddleware } from "./common/middlewares/handle-catch-async.middleware.js";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

const testRoute = handleCatchAsyncMiddleware(
    async (req: Request, res: Response, next: NextFunction) => {
        // get random 0 or 1
        const random = Math.floor(Math.random() * 2);
        if (random === 0) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "Bad request");
        }

        res.status(StatusCodes.OK).json();
    }
);

app.get("/", testRoute);

// 404 Not Found error handler for all other routes
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
});

// Global error handler
app.use(handleGlobalErrorMiddleware);

app.listen(port, host, () => {
    console.log(`[🚀 ready ] http://${host}:${port}`);
});
