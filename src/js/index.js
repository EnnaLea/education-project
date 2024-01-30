import '../css/style.css';
import axios from "axios";



/* These lines of code are selecting elements from the HTML document using their respective IDs and
assigning them to variables. */
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const booksList = document.getElementById('books-list');
const bookDescription = document.getElementById('book-description');
const bookTitle = document.getElementById('book-title');
const bookAuthors = document.getElementById('book-authors');
const bookDescriptionText = document.getElementById('book-description');


/* The code snippet is adding an event listener to the `searchButton` element. When the button is
clicked, it triggers an asynchronous function. */
searchButton.addEventListener('click', async () => {
    const category = searchInput.value;
    try {
        const response = await axios.get(`https://openlibrary.org/subjects/${category}.json`);
        const data = response.data;
        booksList.innerHTML = '';

/* This code snippet is iterating over the `works` array in the `data` object. For each book in the
array, it creates a new list item element (`<li>`) and sets its text content to the title of the
book. */
        data.works.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = book.title;
            listItem.addEventListener('click', async () => {
                const bookResponse = await axios.get(`https://openlibrary.org${book.key}.json`);
                const bookData = bookResponse.data;
                bookTitle.textContent = bookData.title;
                bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
                bookDescriptionText.textContent = bookData.description;
                bookDescription.style.display = 'block';
            });
            booksList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
});
    
























































































































































































































