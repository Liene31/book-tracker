import { Book } from "../models/book.model.js";

export const bookService = {
  //find all books for the specific user
  find: async (userId) => {
    try {
      const books = await Book.find({ user: userId });
      return books;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  create: async (book, userId) => {
    try {
      // first add the userId to book's data
      book.user = userId;
      const bookToAdd = Book(book);
      await bookToAdd.save();

      return bookToAdd;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  updateDetails: async (id, modification) => {
    try {
      //Finds a matching book, updates it according to the update arg and returns the found book (if any).
      //returnDocument: "after" -> says to return new book object, otherwise it returns not-modified book object
      const book = await Book.findByIdAndUpdate(id, modification, {
        returnDocument: "after",
      });

      return book;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  delete: async (bookId, userId) => {
    try {
      // checking if specific user has book with req ID;
      //response returns deletedCount: 0 if match not found, deletedCount: 1 -> if success
      const response = await Book.deleteOne({
        _id: bookId,
        user: userId,
      });

      if (response.deletedCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },
};
