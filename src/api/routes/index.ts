import { Router } from "express";
import userRouter from "./user";
import bookRouter from "./book";

const router = Router();

router.use("/users", userRouter);

router.use("/books", bookRouter);

export default router;
