import { fakeBookService } from "../services/fake/fake.book.service.js";
import { bookService } from "../services/book.service.js";

export const bookController = {
  //get all books for the specific user
  getAll: async (req, res) => {
    //gets this info from auth.middleware which is between router & controller
    const userId = req.user.id;
    try {
      const books = await bookService.find(userId);
      res.status(200).json(books);
    } catch (error) {
      console.log(err);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  insert: async (req, res) => {
    const bookToAdd = req.body;
    //gets this info from auth.middleware which is between router & controller
    const userId = req.user.id;

    try {
      const addedBook = await bookService.create(bookToAdd, userId);
      res.status(201).json(addedBook);
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  updateDetails: async (req, res) => {
    const bookId = req.params.id;
    const modification = req.body;

    try {
      const updatedBook = await bookService.updateDetails(bookId, modification);

      if (!updatedBook) {
        res.status(404).json({
          statusCode: 404,
          message: `Book with id ${bookId} is not found`,
        });
      } else {
        //body has only what needs to be modified but returns as response updated book not just modified fields
        res.status(200).send(updatedBook);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },

  delete: async (req, res) => {
    const bookId = req.params.id;
    //gets this info from auth.middleware which is between router & controller
    const userId = req.user.id;

    try {
      const isDeleted = await bookService.delete(bookId, userId);

      if (isDeleted) {
        res.sendStatus(204);
      } else {
        res.status(404).json({
          statusCode: 404,
          message: `Book with id ${bookId} is not found`,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ statusCode: 500, message: "DB error" });
    }
  },
};
