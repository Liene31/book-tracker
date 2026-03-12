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
    console.log(req.params.id);
    console.log(req.body);

    // const updatedBook

    res.status(200).send("book updated");

    //body has only what needs to be modified but returns all object
  },
};
