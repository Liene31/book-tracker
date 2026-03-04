import { dashboardData } from "./dashboardData.js";
import { bookData } from "./bookData.js";
import { bookStatuses } from "./bookStatuses.js";

const dashboardSection = document.getElementById("dashboard");
const searchOptionsDiv = document.getElementById("search-options-wrapper");
const booksSection = document.getElementById("books");

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
  const searchOptionSelect = document.createElement("select");
  const filterAllOption = document.createElement("option");
  searchOptionSelect.classList.add("search-select");
  searchOptionSelect.name = "search-options";
  searchOptionSelect.id = "search-select";
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

  searchOptionsDiv.append(searchOptionSelect);
}

function createStatusSelect(selectedStatus) {
  const statusSelect = document.createElement("select");
  statusSelect.classList.add("status-select");
  statusSelect.name = "status-select";

  for (let s = 0; s < bookStatuses.length; s++) {
    const statusOption = document.createElement("option");
    statusOption.value = bookStatuses[s].status;
    statusOption.textContent = bookStatuses[s].label;

    statusSelect.append(statusOption);
  }
  statusSelect.value = selectedStatus;
  return statusSelect;
}

// Create Book cards elements in HTML
function createBookCards() {
  booksSection.innerHTML = "";
  for (let i = 0; i < bookData.length; i++) {
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
    imgDiv.style.backgroundImage = `url(${bookData[i].coverUrl})`;

    // Book Info
    const bookInfoDiv = document.createElement("div");
    bookInfoDiv.classList.add("book-info");

    const titleEl = document.createElement("h2");
    titleEl.classList.add("book-title");
    titleEl.textContent = bookData[i].title;

    const authorEl = document.createElement("h3");
    authorEl.classList.add("book-author");
    authorEl.textContent = bookData[i].author;

    // Book Status select
    const selectedBookStatus = bookData[i].status;
    const statusSelect = createStatusSelect(selectedBookStatus);

    // Book Rating
    const bookRatingDiv = document.createElement("div");
    bookRatingDiv.classList.add("book-rating");

    const ratingBtn = document.createElement("button");

    const rating = bookData[i].rating;

    for (let r = 0; r < 5; r++) {
      const ratingIcon = document.createElement("i");
      // evaluates every position
      // r < rating -> filled star, otherwise empty star
      r < rating
        ? ratingIcon.classList.add("rating", "fa-solid", "fa-star")
        : ratingIcon.classList.add("rating", "fa-regular", "fa-star");

      ratingBtn.append(ratingIcon);
    }

    bookRatingDiv.append(ratingBtn);

    // Description paragraph
    const bookDescriptionPara = document.createElement("p");
    bookDescriptionPara.classList.add("book-description");
    bookDescriptionPara.textContent = bookData[i].description;

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
createBookCards();
