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
};
