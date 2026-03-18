import { Router } from "express";
import { bookController } from "../controllers/book.controller.js";
import { authMiddleware } from "../middlewares/auth/auth.middleware.js";

export const bookRouter = Router();

bookRouter.get("/", authMiddleware(), bookController.getAll);
bookRouter.post("/", authMiddleware(), bookController.insert);
bookRouter.patch("/:id", authMiddleware(), bookController.updateDetails);
bookRouter.delete("/:id", authMiddleware(), bookController.delete);
