import { Router } from "express";
import * as userController from "./user.controller";
import { parseRequestBodyMiddleware } from "../../../common/middlewares/parse-request-body.middleware";
import { createUserSchema } from "./schemas/create-user.schema";
import { parseRequestParamsMiddleware } from "../../../common/middlewares/parse-request-params.middleware";
import { getUserByIdSchema } from "./schemas/get-user-by-id.schema";
import { borrowBookSchema } from "./schemas/borrow-book.schema";
import {
    returnBookBodySchema,
    returnBookParamSchema,
} from "./schemas/return-book-schema";

const userRouter = Router();

userRouter
    .route("/")
    .get(userController.getUsers)
    .post(
        parseRequestBodyMiddleware(createUserSchema),
        userController.createUser
    );

userRouter
    .route("/:id")
    .get(
        parseRequestParamsMiddleware(getUserByIdSchema),
        userController.getUserById
    );

userRouter
    .route("/:userId/borrow/:bookId")
    .post(
        parseRequestParamsMiddleware(borrowBookSchema),
        userController.borrowBook
    );

userRouter
    .route("/:userId/return/:bookId")
    .post(
        parseRequestParamsMiddleware(returnBookParamSchema),
        parseRequestBodyMiddleware(returnBookBodySchema),
        userController.returnBook
    );

export default userRouter;
