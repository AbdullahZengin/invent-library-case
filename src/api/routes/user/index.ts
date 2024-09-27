import { Router } from "express";
import * as userController from "./user.controller";
import { parseRequestBodyMiddleware } from "../../../common/middlewares/parse-request-body.middleware";
import { createUserSchema } from "./schemas/create-user.schema";

const userRouter = Router();

userRouter
    .route("/")
    .get(userController.getUsers)
    .post(
        parseRequestBodyMiddleware(createUserSchema),
        userController.createUser
    );

export default userRouter;
