import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { ApiError } from "./common/utils/errors/api.error.js";
import { StatusCodes } from "http-status-codes";
import { handleGlobalErrorMiddleware } from "./common/middlewares/handle-global-error.middleware.js";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// 404 Not Found error handler for all other routes
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
});

// Global error handler
app.use(handleGlobalErrorMiddleware);

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
});
