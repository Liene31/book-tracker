import { dashboardData } from "./dashboardData.js";
import { bookData } from "./bookData.js";
import { bookStatuses } from "./bookStatuses.js";

const dashboardSection = document.getElementById("dashboard");
const booksSection = document.getElementById("books");
const searchForm = document.getElementById("search-form");
const searchOptionSelect = document.getElementById("search-select");
const searchFieldInput = document.getElementById("search-field");

let wantToRead;
let reading;
let finished;

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

// Update bookData with a new status when user changes it in book info card
function updateBookStatus(statusSelect) {
  // event.change detects the change in the status
  statusSelect.addEventListener("change", (event) => {
    const newBookStatus = event.target.value;
    const selectId = event.target.id;

    // identify which book's select status was changed and updates with new value
    for (let i = 0; i < bookData.length; i++) {
      if (bookData[i].id === parseInt(selectId)) {
        bookData[i].status = newBookStatus;
      }
    }
    //if the change in status has happened, update the dashboard with new count
    createDashboard();
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

createDashboard();
createFilterOptions();
createBookCards(bookData);
