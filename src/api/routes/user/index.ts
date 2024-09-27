import { Router } from "express";
import * as userController from "./user.controller";
import { parseRequestBodyMiddleware } from "../../../common/middlewares/parse-request-body.middleware";
import { createUserSchema } from "./schemas/create-user.schema";
import { parseRequestParamsMiddleware } from "../../../common/middlewares/parse-request-params.middleware";
import { getUserByIdSchema } from "./schemas/get-user-by-id.schema";

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

export default userRouter;
