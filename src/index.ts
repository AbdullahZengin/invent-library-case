import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { handleGlobalErrorMiddleware } from "./common/middlewares/handle-global-error.middleware.js";
import { notFoundErrorMiddleware } from "./common/middlewares/not-found-error.middleware.js";
import routes from "./api/routes";
import { AppDataSource } from "./db/data-source.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

app.use("/", routes);

// 404 Not Found error handler middleware to unmatched routes
app.use(notFoundErrorMiddleware);

// Global error handler middleware for all errors
app.use(handleGlobalErrorMiddleware);

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connection successful.");
    })
    .catch((err) => {
        console.error(err);
    });

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
    console.log(`[🚀 ready ] http://localhost:${port}`);
});
