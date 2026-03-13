import { bookData } from "./fakeDb.js";

export const fakeBookService = {
  find: () => {
    return bookData;
  },

  findById: (id) => {
    //should return the book object not just true/false, so the next function can use it
    const book = bookData.find((book) => {
      return book.id === id;
    });

    return book;
  },

  create: (book) => {
    bookData.push(book);
    return book;
  },

  updateDetails: (id, modification) => {
    // findById function is method of the object, not global function
    // can be called fakeBookService.findById(id) or
    // with this, but since I am using arrow function, it will not work
    const book = fakeBookService.findById(id);
    if (!book) {
      return false;
    }

    Object.keys(modification).map((key) => {
      book[key] = modification[key];
    });

    return book;
  },

  delete: (id) => {
    const book = fakeBookService.findById(id);

    if (!book) {
      return false;
    }

    //returns array of all the books except deleted book
    const updatedBooks = bookData.filter((book) => {
      return book.id !== id;
    });

    //Cleans my books (fakeDb) and push all the books except deleted one
    bookData.splice(0);
    bookData.push(...updatedBooks);

    return true;
  },
};
