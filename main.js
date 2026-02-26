import { dashboardData } from "./dashboardData.js";
import { bookData } from "./bookData.js";

// console.log(bookData[0].rating);

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
  const statusSelect = document.createElement("select");
  statusSelect.classList.add("status-select");
  statusSelect.id = "status-select";

  const statusOption = document.createElement("option");
  statusOption.value = "want";
  statusOption.textContent = bookData[i].status;

  statusSelect.append(statusOption);

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
