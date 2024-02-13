import "../css/style.css";
import axios from 'axios';
import _ from 'lodash';
import $ from 'jquery';


const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const booksList = document.getElementById("book");
const bookDescription = document.getElementById("book-details-content");
const descriptionCloseBtn = document.getElementById("description-close-btn");
const bookDescriptionText = document.getElementById("book-description");


// URL base per le richieste API
const baseApiUrl = process.env.OPENLIBRARY_API_KEY;
const coverApiUrl = process.env.OPENLIBRARY_API_KEY_COVER;

const getAuthorName = (book) => _.get(book, 'authors[0].name', 'Unknown');

// Funzione per ottenere la copertina di un libro
const getBookCoverURL = (book) => {
  const coverID = _.get(book, 'cover_id');
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

  const bookElement = $(bookHtml);
  const button = bookElement.find(".description-btn");

  button.on("click", async () => {
    try {
      const bookID = button.data("id");
      const bookResponse = await axios.get(`${baseApiUrl}${bookID}.json`);
      const bookData = bookResponse.data;

      const descriptionText = _.get(bookData, 'description.value', bookData.description) || "No description available.";
      $(bookDescriptionText).text(descriptionText);
      $(bookDescription).parent().addClass("showdescription");
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  });

  return bookElement;
};

$(searchButton).on("click", async () => {
    try {
      const category = $(searchInput).val();
      const response = await axios.get(`${baseApiUrl}/subjects/${category}.json`);
      const data = response.data;
      $(booksList).empty();
  
      if (data.works) {
        const booksPromises = _.map(data.works, createBookElement);
        const booksElements = await Promise.all(booksPromises);
  
        $(booksList).append(...booksElements);
        $(booksList).removeClass("notFound");
      } 
  
      $(descriptionCloseBtn).on("click", () => {
        $(bookDescription).parent().removeClass("showdescription");
      });
    } catch (error) {
        $(booksList).html("Sorry, we didn't find any book!");
        $(booksList).addClass("notFound");
    }
  });