import { Router } from "express";
import { bookRouter } from "./book.router.js";
import { userRouter } from "./user.router.js";
import { authRouter } from "./auth.router.js";

export const router = Router();

router.use("/books", bookRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);
