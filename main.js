import { dashboardData } from "./dashboardData.js";
import { bookData } from "./bookData.js";

const dashboardSection = document.getElementById("dashboard");
const booksSection = document.getElementById("books");

// Create Dashboard elements in HTML
for (let i = 0; i < dashboardData.length; i++) {
  const divEl = document.createElement("div");
  divEl.classList.add("dashboard-card");

  const divValueEl = document.createElement("div");
  divValueEl.classList.add("value");
  divValueEl.textContent = dashboardData[i].value;

  const divLabelEl = document.createElement("div");
  divLabelEl.classList.add("label");
  divLabelEl.textContent = dashboardData[i].label;

  divEl.append(divValueEl, divLabelEl);
  dashboardSection.append(divEl);
}

// Create Book cards elements in HTML

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
const imgEl = document.createElement("img");
imgEl.classList.add("book-image");

// Book Info
const bookInfoDiv = document.createElement("div");
bookInfoDiv.classList.add("book-info");

const titleEl = document.createElement("h2");
titleEl.classList.add("book-title");
titleEl.textContent = "Harry Potter";

const authorEl = document.createElement("h3");
authorEl.classList.add("book-author");
authorEl.textContent = "J. K. Rowling";

// Book Status select
const statusSelect = document.createElement("select");
statusSelect.classList.add("status-select");
statusSelect.id = "status-select";

const statusOption = document.createElement("option");
statusOption.value = "want";
statusOption.textContent = "Want to Read";

statusSelect.append(statusOption);

// Book Rating
const bookRatingDiv = document.createElement("div");
bookRatingDiv.classList.add("book-rating");

const ratingBtn = document.createElement("button");
const ratingIcon = document.createElement("i");
ratingIcon.classList.add("rating", "fa-regular", "fa-star");
ratingBtn.append(ratingIcon);
bookRatingDiv.append(ratingBtn);

// Description paragraph
const bookDescriptionPara = document.createElement("p");
bookDescriptionPara.classList.add("book-description");
bookDescriptionPara.textContent =
  "Twist ending kept me guessing until the very end.";

bookInfoDiv.append(
  titleEl,
  authorEl,
  statusSelect,
  bookRatingDiv,
  bookDescriptionPara,
);

divEl.append(deleteBtn, imgEl, bookInfoDiv);

booksSection.append(divEl);
