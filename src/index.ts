import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { handleGlobalErrorMiddleware } from "./common/middlewares/handle-global-error.middleware.js";
import { notFoundErrorMiddleware } from "./common/middlewares/not-found-error.middleware.js";
import routes from "./api/routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));

//#region RESTful API GET route
// const testRoute = handleCatchAsyncMiddleware(
//     async (req: Request, res: Response, next: NextFunction) => {
//         // get random 0 or 1
//         const random = Math.floor(Math.random() * 2);
//         if (random === 0) {
//             throw new ApiError(StatusCodes.BAD_REQUEST, "Bad request");
//         }

//         res.status(StatusCodes.OK).json({ message: "Hello, World!" });
//     }
// );

// app.get("/", testRoute);

// // RESTful API POST route

// const postSchema = Joi.object().keys({
//     name: Joi.string().required(),
//     email: Joi.string().email().required(),
//     age: Joi.number().integer().min(0).max(150).required(),
// });

// const idSchema = Joi.object().keys({
//     id: Joi.number().integer().min(1).required(),
// });

// const restPostRoute = handleCatchAsyncMiddleware(
//     async (req: Request, res: Response, next: NextFunction) => {
//         console.log(req.body);
//         console.log(req.params);
//         console.log(req.query);
//         // get random 0 or 1
//         // const random = Math.floor(Math.random() * 2);
//         // if (random === 0) {
//         //     throw new ApiError(StatusCodes.BAD_REQUEST, "Bad request");
//         // }

//         res.status(StatusCodes.CREATED).json({ message: "Hello, World!" });
//     }
// );

// app.post(
//     "/:id",
//     parseRequestParamsMiddleware(idSchema),
//     parseRequestBodyMiddleware(postSchema),
//     parseRequestQueryStringMiddleware(postSchema),
//     restPostRoute
// );

//#endregion

app.use("/", routes);

// 404 Not Found error handler middleware to unmatched routes
app.use(notFoundErrorMiddleware);

// Global error handler middleware for all errors
app.use(handleGlobalErrorMiddleware);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => {
    console.log(`[🚀 ready ] http://localhost:${port}`);
});
