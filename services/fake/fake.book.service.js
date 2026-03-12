import { bookData } from "./fakeDb.js";

export const fakeBookService = {
  find: () => {
    return bookData;
  },

  create: (book) => {
    bookData.push(book);
    return book;
  },
};
