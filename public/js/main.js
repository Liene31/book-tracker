import { dashboardData } from "./dashboardData.js";
import { bookStatuses } from "./bookStatuses.js";

const dashboardSection = document.getElementById("dashboard");
const booksSection = document.getElementById("books");
const searchForm = document.getElementById("search-form");
const searchOptionSelect = document.getElementById("search-select");
const searchFieldInput = document.getElementById("search-field");
const addBookBtn = document.getElementById("add-book-btn");
const closeBookInputBtn = document.getElementById("close-book-form");
const addBookModal = document.getElementById("modal");
const bookInput = document.getElementById("add-book-form");

let wantToRead;
let reading;
let finished;

let bookData = [];

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/books/");
    if (response) {
      bookData = response.data;
      createBookCards(bookData);
      createDashboard();
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};

// Counts from bookData, status of each book in order to show it in dashboard
function countBookStatus() {
  wantToRead = 0;
  reading = 0;
  finished = 0;
  for (let i = 0; i < bookData.length; i++) {
    if (bookData[i].status === "want") {
      wantToRead++;
    }

    if (bookData[i].status === "reading") {
      reading++;
    }

    if (bookData[i].status === "finished") {
      finished++;
    }
  }
}

function displayBookCountStatusOnDashboard(status, div) {
  if (status === "want") {
    div.textContent = wantToRead;
  }

  if (status === "reading") {
    div.textContent = reading;
  }

  if (status === "finished") {
    div.textContent = finished;
  }

  if (status === "all") {
    div.textContent = wantToRead + finished + reading;
  }
}

// Create Dashboard elements in HTML
function createDashboard() {
  dashboardSection.innerHTML = "";
  countBookStatus();
  for (let i = 0; i < dashboardData.length; i++) {
    const divEl = document.createElement("div");
    divEl.classList.add("dashboard-card");

    const divValueEl = document.createElement("div");
    divValueEl.classList.add("value");

    displayBookCountStatusOnDashboard(dashboardData[i].status, divValueEl);

    const divLabelEl = document.createElement("div");
    divLabelEl.classList.add("label");
    divLabelEl.textContent = dashboardData[i].label;

    divEl.append(divValueEl, divLabelEl);
    dashboardSection.append(divEl);
  }
}

//Create search selection options
function createFilterOptions() {
  const filterAllOption = document.createElement("option");
  filterAllOption.value = "all";
  filterAllOption.textContent = "All books";

  searchOptionSelect.append(filterAllOption);

  //Create search selection options
  for (let d = 0; d < bookStatuses.length; d++) {
    const searchOption = document.createElement("option");
    searchOption.value = bookStatuses[d].status;
    searchOption.textContent = bookStatuses[d].label;

    searchOptionSelect.append(searchOption);
  }
}

function createStatusSelect(selectedStatus, bookId) {
  const statusSelect = document.createElement("select");
  statusSelect.classList.add("status-select");
  statusSelect.name = "status-select";
  statusSelect.id = bookId;

  for (let s = 0; s < bookStatuses.length; s++) {
    const statusOption = document.createElement("option");
    statusOption.value = bookStatuses[s].status;
    statusOption.textContent = bookStatuses[s].label;

    statusSelect.append(statusOption);
  }
  statusSelect.value = selectedStatus;

  updateBookStatus(statusSelect);

  return statusSelect;
}

async function updateBook(id, modification) {
  try {
    const response = await axios.patch(
      `http://localhost:3000/api/books/${id}`,
      modification,
    );
    console.log(response);
    await fetchData();
  } catch (error) {
    console.error(error.message);
  }
}

// Update bookData with a new status when user changes it in book info card
function updateBookStatus(statusSelect) {
  // event.change detects the change in the status
  statusSelect.addEventListener("change", async (event) => {
    const newBookStatus = event.target.value;
    const selectId = event.target.id;

    const newStatus = {
      status: newBookStatus,
    };

    await updateBook(selectId, newStatus);
  });
}

// Search

let filterSelection;

function handleSearchSelect() {
  searchOptionSelect.addEventListener("change", (event) => {
    filterSelection = event.target.value;

    if (filterSelection === "all") {
      return createBookCards(bookData);
    }

    const filteredBooks = bookData.filter((books) => {
      return books.status === filterSelection;
    });

    createBookCards(filteredBooks);
  });
}

handleSearchSelect();

function handleSearchInput() {
  //prevent the browser from reloading the page
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //detect every change while the user types
  searchFieldInput.addEventListener("input", () => {
    const inputValue = searchFieldInput.value.toLowerCase();

    //return the books which match the search and status
    const searchResults = bookData.filter((book) => {
      if (filterSelection === undefined || filterSelection === "all") {
        return (
          book.title.toLowerCase().includes(inputValue) ||
          book.author.toLowerCase().includes(inputValue)
        );
      } else if (filterSelection === book.status) {
        return (
          book.title.toLowerCase().includes(inputValue) ||
          book.author.toLowerCase().includes(inputValue)
        );
      }
    });

    createBookCards(searchResults);
  });
}

handleSearchInput();

// Create Book cards elements in HTML
function createBookCards(books) {
  booksSection.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    // Book wrapper
    const divEl = document.createElement("div");
    divEl.classList.add("book-wrapper");

    // Delete Btn
    const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("i");
    deleteBtn.classList.add("delete-book");
    deleteIcon.classList.add("delete-icon", "fa-solid", "fa-trash-can");
    deleteBtn.append(deleteIcon);

    // Book Cover
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("book-image");
    imgDiv.style.backgroundImage = `url(${books[i].coverUrl})`;

    // Book Info
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book-info");

    const titleEl = document.createElement("h2");
    titleEl.classList.add("book-title");
    titleEl.textContent = books[i].title;

    const authorEl = document.createElement("h3");
    authorEl.classList.add("book-author");
    authorEl.textContent = books[i].author;

    // Book Status select
    const selectedBookStatus = books[i].status;
    const bookId = books[i].id;
    //Gets from the function Select element to append later to the bookInfoDiv
    const statusSelect = createStatusSelect(selectedBookStatus, bookId);

    // Book Rating
    const bookRatingDiv = document.createElement("div");
    bookRatingDiv.classList.add("book-rating");

    const rating = books[i].rating;

    for (let r = 0; r < 5; r++) {
      const ratingIcon = document.createElement("button");
      // evaluates every position
      // r < rating -> filled star, otherwise empty star
      r < rating
        ? ratingIcon.classList.add("rating", "fa-solid", "fa-star")
        : ratingIcon.classList.add("rating", "fa-regular", "fa-star");

      // detects which star's index was clicked and adds + 1 to transform in rating
      // update booksData with new rating and render the card with updates
      ratingIcon.addEventListener("click", () => {
        const starClicked = r + 1;
        books[i].rating = starClicked;
        createBookCards(books);
      });

      bookRatingDiv.append(ratingIcon);
    }

    // Description paragraph
    const bookDescriptionPara = document.createElement("p");
    bookDescriptionPara.classList.add("book-description");
    bookDescriptionPara.textContent = books[i].description;

    bookInfoDiv.append(
      titleEl,
      authorEl,
      statusSelect,
      bookRatingDiv,
      bookDescriptionPara,
    );

    divEl.append(deleteBtn, imgDiv, bookInfoDiv);

    booksSection.append(divEl);
  }
}

function capitalize(str) {
  const string = str.split(" ");
  const cased = [];

  string.map((word) =>
    cased.push(word[0].toUpperCase() + word.slice(1).toLowerCase()),
  );

  return cased.join(" ");
}

// Open -> Add New Book Form
addBookBtn.addEventListener("click", () => {
  addBookModal.style.display = "flex";
  searchForm.style.pointerEvents = "none";
  booksSection.style.pointerEvents = "none";
});

// Close -> Add New Book Form
closeBookInputBtn.addEventListener("click", () => {
  addBookModal.style.display = "none";
  searchForm.style.pointerEvents = "auto";
  booksSection.style.pointerEvents = "auto";
  bookInput.reset();
});

//POST book to backend
async function addBook(book) {
  try {
    const response = await axios.post("http://localhost:3000/api/books/", book);
  } catch (error) {
    console.error(error.message);
  }
}

//Get user input

bookInput.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = capitalize(bookInput.elements.title.value);
  const author = capitalize(bookInput.elements.author.value);
  const status = bookInput.elements.status.value;
  const rating = bookInput.elements.rating.valueAsNumber;
  const description = bookInput.elements.note.value;
  const cover = bookInput.elements.cover.value;

  const book = {
    id: Math.floor(Math.random() * 100),
    title: title,
    author: author,
    status: status,
    rating: rating ? rating : 0,
    description: description,
    coverUrl: cover
      ? cover
      : "https://static.vecteezy.com/system/resources/thumbnails/028/646/039/small/closeup-of-books-wellorganized-on-shelves-in-the-bookstore-the-concept-of-education-photo.jpg",
  };

  await addBook(book);
  await fetchData();

  bookInput.reset();
  addBookModal.style.display = "none";
  searchForm.style.pointerEvents = "auto";
  booksSection.style.pointerEvents = "auto";
});

fetchData();
createFilterOptions();
