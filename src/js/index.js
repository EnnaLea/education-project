import '../css/style.css';
import axios from "axios";


const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const booksContainer = document.getElementById('books-container');



searchButton.addEventListener('click', () => {
    const category = searchInput.value;
    fetchBooks(category);
});

function fetchBooks(category) {
    axios.get(`https://openlibrary.org/subjects/${category}.json`)
        .then(response => {
            const data = response.data;
            const books = data.works.map(book =>({
                title: book.title,
                author: book.authors[0].name,
                description: book.description,
                key: book.key
                // image: book.cover
            }));
            displayBooks(books);
        })
        .catch(error => {
            console.error('Error fetching books:', error);
        })
}


// function displayBooks(books) {
//     booksContainer.innerHTML = '';
//     books.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//         <img src="${book.cover}" alt="">
//             <h3>${book.title}</h3>
//             <p>Author: ${book.author}</p>
//             <p>Description: ${book.description}</p>
//         `;
//         booksContainer.appendChild(bookCard);

//     });
// }

// function displayBooks(books) {
//     booksContainer.innerHTML = '';
//     books.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//         <img src="${book.cover}" alt="">
//             <h3 id="book-title-${book.id}">${book.title}</h3>
//             <p>Author: ${book.author}</p>
//             <button onclick="displayBookDescription(${book.id})">Read more</button>
//         `;
//         booksContainer.appendChild(bookCard);
        
        
//     });
// }

// function displayBookDescription(bookId) {
//     const book = book.find(book => book.id === bookId);
//     bookDescription.innerHTML = `
//         <p>Title: ${book.title}</p>
//         <p>Author: ${book.author}</p>
//         <p>Description: ${book.description}</p>
//     `;
// }


// function displayBooks(books) {
//     booksContainer.innerHTML = '';
//     books.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//         <img src="${book.cover}" alt="">
//             <h3 id="book-title-${book.key}">${book.title}</h3>
//             <p>Author: ${book.author}</p>
//             <button id="book-description" onclick="displayBookDescription(${book.key})">Read more</button>
//         `;
//         booksContainer.appendChild(bookCard);
        
//     });
// }


// function displayBooks(books) {
//   booksContainer.innerHTML = '';
//   books.forEach(book => {
//     const bookCard = document.createElement('div');
//     bookCard.className = 'book-card';
//     bookCard.innerHTML = `
//       <img src="${book.cover}" alt="${book.title}">
//       <h3 title="${book.title}" id="book-title-${book.key}">${book.title}</h3>
//       <p>Author: ${book.author}</p>
//       <button data-key="${book.key}" id="book-description">Read more</button>
//     `;
//     booksContainer.appendChild(bookCard);

//     // Add event listener instead of onclick attribute
//     document.getElementById('book-description').addEventListener('click', () => {
//       displayBookDescription(book.key);
//     });
//   });
// }

// function displayBookDescription(bookId) {
//     const bookDescription = axios.get(`https://openlibrary.org${bookId}.json`)
//         .then(response => {
//             const book = response.data;
//     bookDescription.innerHTML = `
//         <p>Title: ${book.title}</p>
//         <p>Author: ${book.author}</p>
//         <p>Description: ${book.description}</p>
//     `;
//         })
// }


function displayBooks(books) {
    booksContainer.innerHTML = '';
    books.forEach(book => {
      const bookCard = document.createElement('div');
      bookCard.className = 'book-card';
      bookCard.innerHTML = `
        <img src="${book.cover}" alt="${book.title}">
        <h3 title="${book.title}" id="book-title-${book.key}">${book.title}</h3>
        <p>Author: ${book.author}</p>
        <button data-key="${book.key}" id="book-description">Read more</button>
      `;
      booksContainer.appendChild(bookCard);
  
      // Add event listener instead of onclick attribute
      document.getElementById('book-description').addEventListener('click', () => {
        displayBookDescription(book.key);
      });
    });
  }
  
  function displayBookDescription(bookId) {
    axios.get(`https://openlibrary.org/works/${bookId}.json`)
      .then(response => {
        const book = response.data;
        const bookDescription = document.createElement('div');
        bookDescription.innerHTML = `
          <p>Title: ${book.title}</p>
          <p>Author: ${book.author_name}</p>
          <p>Description: ${book.description}</p>
        `;
        booksContainer.appendChild(bookDescription);
      })
      .catch(error => {
        console.error(error);
      });
  }



// function displayBookDescription(bookId) {
//     const bookDescription = document.createElement('p')
//     const description = getElementById('book-description');
//     description.addEventListener('click', axios.get(`https://openlibrary.org${bookId}.json`)
//     .then(response => {
//         const data = response.data;
//         bookDescription.textContent = data.description;


//     })
//     .catch(error => {
//         console.error('Error fetching description:', error);
//     })
//     )

// }




// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const booksContainer = document.getElementById("books-container");

// searchButton.addEventListener("click", () => {
//   const category = searchInput.value;
//   axios
//     .get(`https://openlibrary.org/subjects/${category}.json`)
//     .then((response) => {
//       booksContainer.innerHTML = "";
//       response.data.works.forEach((book) => {

//         const bookCard = document.createElement("div");
//         bookCard.classList.add("book-card");
//         const title = document.createElement("h2");
//         title.textContent = book.title;
//         title.addEventListener("click", () => {
//           axios.get(`https://openlibrary.org/works/${book.key}.json`)
//             .then((response) => {
//               const description = document.createElement("p");
//               description.textContent = response.data.description;
//               bookCard.appendChild(description);
//             });
//         });
//         const authors = document.createElement("p");
//         authors.textContent = book.authors.join(", ");
//         const cover = document.createElement("img");
        
//         cover.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        
//         bookCard.appendChild(title);
//         bookCard.appendChild(authors);
//         bookCard.appendChild(cover);
//         booksContainer.appendChild(bookCard);


        // bookCard.addEventListener("click", () => {
        //    axios.get(`https://openlibrary.org/works/${book.key}.json`)
        //     .then((response) => {
        //       const description = document.createElement("p");
        //       description.textContent = response.data.description;
        //       bookCard.appendChild(description);
        //     });
        // });
//       });
//     });
// });

//////////////////////////////////////////////////////////


// searchButton.addEventListener("click", () => {
//     const category = searchInput.value;
//     axios
//       .get(`https://openlibrary.org/subjects/${category}.json`)
//       .then((response) => {
//         booksContainer.innerHTML = "";
//         response.data.works.forEach((book) => {
//           const bookCard = document.createElement("div");
//           bookCard.classList.add("book-card");
//           const title = document.createElement("h2");
//           title.textContent = book.title;
//           const authors = document.createElement("p");
//           authors.textContent = book.authors.join(", ");
//           const cover = document.createElement("img");
//           cover.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
//           bookCard.appendChild(title);
//           bookCard.appendChild(authors);
//           bookCard.appendChild(cover);
//           booksContainer.appendChild(bookCard);
//           bookCard.addEventListener("click", () => {
//             axios
//               .get(`https://openlibrary.org/works/${book.key}.json`)
//               .then((response) => {
//                 const description = document.createElement("p");
//                 description.textContent = response.data.description;
//                 bookCard.appendChild(description);
//               });
//           });
//         });
//       });
//   });


/////////////////////////////////////////////////////////////

// const searchButton = document.getElementById('search-button');
// const searchInput = document.getElementById('search-input');
// const booksList = document.getElementById('books-list');


// searchButton.addEventListener('click', () => {
//     const category = searchInput.value;
//     fetchBooks(category);
// });

// function fetchBooks(category) {
//     axios.get(`https://openlibrary.org/subjects/${category}.json`)
//         .then(response => {
//             const data = response.data;
//             const books = data.works.map(book =>({
//                 title: book.title,
//                 author: book.authors[0].name,
//                 description: book.description,
//                 image: book.cover
//             }));
//             displayBooks(books);
//         })
//         .catch(error => {
//             console.error('Error fetching books:', error);
//         })
// }

// function displayBooks(books) {
//     booksList.innerHTML = '';
//     books.forEach(book => {
//         const bookCard = document.createElement('div');
//         bookCard.className = 'book-card';
//         bookCard.innerHTML = `
//         <img src="${book.cover}" alt="${book.title}" onerror="this.onerror=null; this.src='path/to/default/image.jpg';">
//             <h3>${book.title}</h3>
//             <p>Author: ${book.author}</p>
//             <p>Description: ${book.description}</p>
//         `;
//         booksList.appendChild(bookCard);

//     });
// }




//////////////////////////////////////////////

/* These lines of code are selecting elements from the HTML document using their respective IDs and
assigning them to variables. */
// const searchButton = document.getElementById('search-button');
// const searchInput = document.getElementById('search-input');
// const booksList = document.getElementById('books-list');
// const bookDescription = document.getElementById('book-description');
// const bookTitle = document.getElementById('book-title');
// const bookAuthors = document.getElementById('book-authors');
// const bookDescriptionText = document.getElementById('book-description');



/* The code snippet is adding an event listener to the `searchButton` element. When the button is
clicked, it triggers an asynchronous function. */
// searchButton.addEventListener('click', async () => {
//     const category = searchInput.value;
//     try {
//         const response = await axios.get(`https://openlibrary.org/subjects/${category}.json`);
//         const data = response.data;
//         booksList.innerHTML = '';

/* This code snippet is iterating over the `works` array in the `data` object. For each book in the
array, it creates a new list item element (`<li>`) and sets its text content to the title of the
book. */
//         data.works.forEach(book => {
//             const listItem = document.createElement('li');
//             listItem.textContent = book.title;
//             listItem.addEventListener('click', async () => {
//                 const bookResponse = await axios.get(`https://openlibrary.org${book.key}.json`);
//                 const bookData = bookResponse.data;
//                 bookTitle.textContent = bookData.title;
//                 bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
//                 bookDescriptionText.textContent = bookData.description;
//                 bookDescription.style.display = 'block';
//             });
//             booksList.appendChild(listItem);
//         });
//     } catch (error) {
//         console.error('Error fetching data: ', error);
//     }
// });
    
























































































































































































































