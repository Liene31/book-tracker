import { Router } from "express";
import { bookController } from "../controllers/book.controller.js";

export const bookRouter = Router();

bookRouter.get("/", bookController.getAll);
bookRouter.post("/", bookController.insert);
