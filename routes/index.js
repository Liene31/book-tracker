import { Router } from "express";
import { bookRouter } from "./book.router.js";
import { userRouter } from "./user.router.js";

export const router = Router();

router.use("/books", bookRouter);
router.use("/users", userRouter);
