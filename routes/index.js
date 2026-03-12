import { Router } from "express";
import { bookRouter } from "./book.router.js";

export const router = Router();

router.use("/books", bookRouter);
