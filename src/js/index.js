import "../css/style.css";
import axios from 'axios';

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const booksList = document.getElementById("book");
const bookDescription = document.getElementById("book-details-content");
const descriptionCloseBtn = document.getElementById("description-close-btn");
const bookDescriptionText = document.getElementById("book-description");

// URL base per le richieste API
const baseApiUrl = process.env.OPENLIBRARY_API_KEY;
const coverApiUrl = process.env.OPENLIBRARY_API_KEY_COVER;

// Funzione per ottenere il nome dell'autore di un libro
const getAuthorName = (book) => book.authors[0]?.name || 'Unknown';

// Funzione per ottenere la copertina di un libro
const getBookCoverURL = (book) => {
  const coverID = book.cover_id;
  return coverID ? `${coverApiUrl}/b/id/${coverID}-L.jpg` : '';
};

// Funzione per creare un elemento libro
const createBookElement = (book) => {
  const coverURL = getBookCoverURL(book);
  const authorName = getAuthorName(book);

  const bookHtml = `
    <div class="book-item text-center" data-id="${book.id}">
      <div class="book-img">
        <img src="${coverURL}" alt="cover">
      </div>
      <div class="book-name">
        <h3>${book.title}</h3>
        <p>Author: ${authorName}</p> 
        <button class="description-btn" data-id="${book.key}">Get description</button>
      </div>
    </div>
  `;

  const bookElement = document.createRange().createContextualFragment(bookHtml);
  const button = bookElement.querySelector(".description-btn");

  button.addEventListener("click", async () => {
    try {
      const bookID = button.dataset.id;
      const bookResponse = await axios.get(`${baseApiUrl}${bookID}.json`);
      const bookData = bookResponse.data;

      const descriptionText = bookData.description?.value || bookData.description || "No description available.";
      bookDescriptionText.textContent = descriptionText;
      console.log(bookDescriptionText);
      bookDescription.parentElement.classList.add("showdescription");
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  });

  return bookElement;
};

// Evento click sul pulsante di ricerca
searchButton.addEventListener("click", async () => {
  try {
    const category = searchInput.value;
    const response = await axios.get(`${baseApiUrl}/subjects/${category}.json`);
    const data = response.data;
    booksList.innerHTML = "";

    if (data.works) {
      const booksPromises = data.works.map(createBookElement);
      const booksElements = await Promise.all(booksPromises);

      booksList.append(...booksElements);
      booksList.classList.remove("notFound");
    } else {
      booksList.innerHTML = "Sorry, we didn't find any book!";
      booksList.classList.add("notFound");
    }

    descriptionCloseBtn.addEventListener("click", () => {
      bookDescription.parentElement.classList.remove("showdescription");
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});