import { Router } from "express";
import * as bookController from "./book.controller";
import { parseRequestBodyMiddleware } from "../../../common/middlewares/parse-request-body.middleware";
import { parseRequestParamsMiddleware } from "../../../common/middlewares/parse-request-params.middleware";
import { getBookByIdSchema } from "./schemas/get-book-by-id.schema";
import { createBookSchema } from "./schemas/create-book.schema";

const userRouter = Router();

userRouter
    .route("/")
    .get(bookController.getBooks)
    .post(
        parseRequestBodyMiddleware(createBookSchema),
        bookController.createBook
    );

userRouter
    .route("/:id")
    .get(
        parseRequestParamsMiddleware(getBookByIdSchema),
        bookController.getBookByIdWithScore
    );

export default userRouter;
