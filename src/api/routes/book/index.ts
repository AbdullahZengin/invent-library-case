import { Router } from "express";
import * as bookController from "./book.controller";
import { parseRequestBodyMiddleware } from "../../../common/middlewares/parse-request-body.middleware";

const userRouter = Router();

userRouter.route("/").get(bookController.getBooks);

export default userRouter;
