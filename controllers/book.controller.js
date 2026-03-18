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
    //gets this info from auth.middleware which is between router & controller
    const userId = req.user.id;

    try {
      const isUpdated = await bookService.updateDetails(
        bookId,
        userId,
        modification,
      );
      // I am not retuning the updated book object because using updateOne()
      // Currently in frontend I don't do anything with response object rather fetch all books to update UI
      // Later on that can be improved with using response data and not to re-fetching in frontend
      if (isUpdated) {
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
