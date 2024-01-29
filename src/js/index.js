import '../css/style.css';


const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const booksList = document.getElementById('books-list');
const bookDescription = document.getElementById('book-description');
const bookTitle = document.getElementById('book-title');
const bookAuthors = document.getElementById('book-authors');
const bookDescriptionText = document.getElementById('book-description');


//ricerca libri per categoria
searchButton.addEventListener('click', async () => {

    const category = searchInput.value;
    const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
    const data = await response.json();
    booksList.innerHTML = '';
    

    data.works.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = book.title;
        listItem.addEventListener('click', async () => {
            const bookResponse = await fetch(`https://openlibrary.org${book.key}.json`);
            const bookData = await bookResponse.json();
            bookTitle.textContent = bookData.title;
            bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
            bookDescriptionText.textContent = bookData.description;
            bookDescription.style.display = 'block';
        });
        booksList.appendChild(listItem);
    });

});
























































































































































































































