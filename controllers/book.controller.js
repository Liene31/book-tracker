import { fakeBookService } from "../services/fake/fake.book.service.js";

export const bookController = {
  getAll: (req, res) => {
    const books = fakeBookService.find();

    res.status(200).json(books);
  },

  insert: (req, res) => {
    const bookToAdd = req.body;

    const addedBook = fakeBookService.create(bookToAdd);

    res.status(201).json(addedBook);
  },

  updateDetails: (req, res) => {
    const bookId = parseInt(req.params.id);
    const modification = req.body;

    const updatedBook = fakeBookService.updateDetails(bookId, modification);

    if (!updatedBook) {
      res.status(404).json({
        statusCode: 404,
        message: `Book with id ${bookId} is not found`,
      });
    }
    //body has only what needs to be modified but returns as response updated book not just modified fields
    res.status(200).send(updatedBook);
  },

  delete: (req, res) => {
    const bookId = parseInt(req.params.id);
    const isDeleted = fakeBookService.delete(bookId);

    if (isDeleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({
        statusCode: 404,
        message: `Book with id ${bookId} is not found`,
      });
    }
  },
};
