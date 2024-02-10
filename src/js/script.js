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
      } else {
        $(booksList).html("Sorry, we didn't find any book!");
        $(booksList).addClass("notFound");
      }
  
      $(descriptionCloseBtn).on("click", () => {
        $(bookDescription).parent().removeClass("showdescription");
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });





/*
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
*/


//codice con dotenv

// const searchButton = document.getElementById("search-btn");
// const searchInput = document.getElementById("search-input");
// const booksList = document.getElementById("book");
// const bookDescription = document.getElementById("book-details-content");
// const descriptionCloseBtn = document.getElementById("description-close-btn");
// const bookDescriptionText = document.getElementById("book-description");

// // URL base per le richieste API
// const baseApiUrl = process.env.OPENLIBRARY_API_KEY;
// const coverApiUrl = process.env.OPENLIBRARY_API_KEY_COVER;

// // Funzione per ottenere il nome dell'autore di un libro
// const getAuthorName = (book) => book.authors[0]?.name || 'Unknown';

// // Funzione per ottenere la copertina di un libro
// const getBookCoverURL = (book) => {
//   const coverID = book.cover_id;
//   return coverID ? `${coverApiUrl}/b/id/${coverID}-L.jpg` : '';
// };

// // Funzione per creare un elemento libro
// const createBookElement = (book) => {
//   const coverURL = getBookCoverURL(book);
//   const authorName = getAuthorName(book);

//   const bookHtml = `
//     <div class="book-item text-center" data-id="${book.id}">
//       <div class="book-img">
//         <img src="${coverURL}" alt="cover">
//       </div>
//       <div class="book-name">
//         <h3>${book.title}</h3>
//         <p>Author: ${authorName}</p> 
//         <button class="description-btn" data-id="${book.key}">Get description</button>
//       </div>
//     </div>
//   `;

//   const bookElement = document.createRange().createContextualFragment(bookHtml);
//   const button = bookElement.querySelector(".description-btn");

//   button.addEventListener("click", async () => {
//     try {
//       const bookID = button.dataset.id;
//       const bookResponse = await fetch(`${baseApiUrl}${bookID}.json`);
//       const bookData = await bookResponse.json();

//       const descriptionText = bookData.description?.value || bookData.description || "No description available.";
//       bookDescriptionText.textContent = descriptionText;
//       console.log(bookDescriptionText);
//       bookDescription.parentElement.classList.add("showdescription");
//     } catch (error) {
//       console.error("Error fetching book data:", error);
//     }
//   });

//   return bookElement;
// };

// // Evento click sul pulsante di ricerca
// searchButton.addEventListener("click", async () => {
//   try {
//     const category = searchInput.value;
//     const response = await fetch(`${baseApiUrl}/subjects/${category}.json`);
//     const data = await response.json();
//     booksList.innerHTML = "";

//     if (data.works) {
//       const booksPromises = data.works.map(createBookElement);
//       const booksElements = await Promise.all(booksPromises);

//       booksList.append(...booksElements);
//       booksList.classList.remove("notFound");
//     } else {
//       booksList.innerHTML = "Sorry, we didn't find any book!";
//       booksList.classList.add("notFound");
//     }

//     descriptionCloseBtn.addEventListener("click", () => {
//       bookDescription.parentElement.classList.remove("showdescription");
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// });






/*
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const booksList = document.getElementById("book");
const bookDescription = document.getElementById("book-details-content");
const descriptionCloseBtn = document.getElementById("description-close-btn");
const bookDescriptionText = document.getElementById("book-description");

//costanti per le variabili d'ambiente
// const apiKeyBooks = process.env.OPENLIBRARY_API_KEY;
// const apiKeyDesc = process.env.OPENLIBRARY_API_KEY_DECS;
// const apiKeyCover = process.env.OPENLIBRARY_API_KEY;



// Funzione per ottenere la copertina di un libro
const getBookCoverURL = (book) => {
  const coverID = book.cover_id;
  return coverID ? `https://covers.openlibrary.org/b/id/${coverID}-L.jpg` : '';
};

// Funzione per ottenere il nome dell'autore di un libro
const getAuthorName = (book) => book.authors[0]?.name || 'Unknown';

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
      const bookResponse = await fetch(`https://openlibrary.org${bookID}.json`);
      const bookData = await bookResponse.json();

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
    const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
    const data = await response.json();
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


*/







//results with cards

// const searchButton = document.getElementById("search-btn");
// const searchInput = document.getElementById("search-input");
// const booksList = document.getElementById("book");
// const bookDescription = document.getElementById("book-details-content");

// const descriptionCloseBtn = document.getElementById("description-close-btn");

// const bookDescriptionText = document.getElementById("book-description");


// //ottimizzazione cards piu cover
// searchButton.addEventListener("click", async () => {
//     try {
//       const category = searchInput.value;
//       const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
//       const data = await response.json();
//       booksList.innerHTML = "";
  
//       if (data.works) {
//         const booksPromises = data.works.map(async (book) => {
//           const coverURL = book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : '';
//           const authorName = book.authors[0]?.name || 'Unknown';
  
//           const bookHtml = `
//             <div class="book-item text-center" data-id="${book.id}">
//               <div class="book-img">
//                 <img src="${coverURL}" alt="cover">
//               </div>
//               <div class="book-name">
//                 <h3>${book.title}</h3>
//                 <p>Author: ${authorName}</p> 
//                 <button class="description-btn" data-id="${book.key}">Get description</button>
//               </div>
//             </div>
//           `;
  
//           const bookElement = document.createRange().createContextualFragment(bookHtml);
  
//           const button = bookElement.querySelector(".description-btn");
//           button.addEventListener("click", async () => {
//             try {
//               const bookId = button.dataset.id;
//               const bookResponse = await fetch(`https://openlibrary.org${bookId}.json`);
//               const bookData = await bookResponse.json();
  
//               const descriptionText = bookData.description?.value || bookData.description || "No description available.";
//               bookDescriptionText.textContent = descriptionText;
  
//               bookDescription.parentElement.classList.add("showdescription");
//             } catch (error) {
//               console.error("Error fetching book data:", error);
//             }
//           });
  
//           return bookElement;
//         });
  
//         const booksElements = await Promise.all(booksPromises);
//         booksList.append(...booksElements);
//         booksList.classList.remove("notFound");
//       } else {
//         booksList.innerHTML = "Sorry, we didn't find any book!";
//         booksList.classList.add("notFound");
//       }
  
//       descriptionCloseBtn.addEventListener("click", () => {
//         bookDescription.parentElement.classList.remove("showdescription");
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   });
  


























//cards con cover
/*
searchButton.addEventListener("click", async () => {
    try {
      const category = searchInput.value;
      const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
      const data = await response.json();
      booksList.innerHTML = "";
        
      if (data.works) {
        const html = data.works.map((book) => `
          <div class="book-item text-center" data-id="${book.id}">
            <div class="book-img">
              <img src="${book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : ''}" alt="cover">
            </div>
            <div class="book-name">
              <h3>${book.title}</h3>
              <p>Author: ${book.authors[0]?.name || 'Unknown'}</p> 
              <button class="description-btn" data-id="${book.key}" id="get-description">Get description</button>
            </div>
          </div>
        `).join('');
  
        booksList.innerHTML = html;
        booksList.classList.remove("notFound");
      } else {
        booksList.innerHTML = "Sorry, we didn't find any book!";
        booksList.classList.add("notFound");
      }
  
      const descriptionButtons = document.querySelectorAll(".description-btn");
  
      descriptionButtons.forEach((button) => {
        button.addEventListener("click", async () => {
          try {
            const bookId = button.dataset.id;
            const bookResponse = await fetch(`https://openlibrary.org${bookId}.json`);
            const bookData = await bookResponse.json();
  
            const descriptionText = bookData.description?.value || bookData.description || "No description available.";
            bookDescriptionText.textContent = descriptionText;
  
            bookDescription.parentElement.classList.add("showdescription");
          } catch (error) {
            console.error("Error fetching book data:", error);
          }
        });
      });
  
      descriptionCloseBtn.addEventListener("click", () => {
        bookDescription.parentElement.classList.remove("showdescription");
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  */





/*
searchButton.addEventListener("click", async () => {
    try {
      const category = searchInput.value;
      const response = await fetch(
        `https://openlibrary.org/subjects/${category}.json`
      );
      const data = await response.json();
      booksList.innerHTML = "";
  
      let html = "";
      if (data.works) {
        data.works.forEach((book) => {
          html += `
                <div class="book-item text-center" data-id="${book.id}">
                <div class="book-img">
                        <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : ''}" alt="">
                </div>
                <div class="book-name card">
                    <h3 class="card-title" id="card-title">${book.title}</h3>
                    <p>Author: ${book.authors[0].name}</p>  
                    <button class="description-btn" data-id="${book.key}" id="get-description" >Get description</button>
                </div>
                </div> 
                    `;
        });
  
        booksList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any book!";
        booksList.classList.add("notFound");
      }
  
      booksList.innerHTML = html;
  
      const descriptionButtons =
        document.getElementsByClassName("description-btn");
  
      for (const button of descriptionButtons) {
        button.addEventListener("click", async () => {
          try {
            const bookId = button.dataset.id;
            const bookResponse = await fetch(
              `https://openlibrary.org${bookId}.json`
            );
            const bookData = await bookResponse.json();
  
            if (
              typeof bookData.description === "object" &&
              bookData.description !== null
            ) {
              bookDescriptionText.textContent =
                bookData.description.value || "No description available.";
            } else {
              bookDescriptionText.textContent =
                bookData.description || "No description available.";
            }
  
            bookDescription.parentElement.classList.add("showdescription");
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        });
      }
  
      descriptionCloseBtn.addEventListener("click", () => {
        bookDescription.parentElement.classList.remove("showdescription");
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
*/

















/*
searchButton.addEventListener("click", async () => {
    try {
      const category = searchInput.value;
      const response = await fetch(
        `https://openlibrary.org/subjects/${category}.json`
      );
      const data = await response.json();
      booksList.innerHTML = "";
        
      let html = "";
      if (data.works) {
        data.works.forEach((book) => {
          html += `
                <div class="book-item text-center" data-id="${book.id}">
                <div class="book-img">
                        <img src="${book.key ? `https://covers.openlibrary.org/b/id/${book.key}-S.jpg` : ''}" alt="">
                </div>
                <div class="book-name card">
                    <h3 class="card-title" id="card-title">${book.title}</h3>
                    <p>Author: ${book.authors[0].name}</p> 
                    <button class="description-btn" data-id="${book.key}" id="get-description" >Get description</button>
                </div>
                </div> 
                    `;
        });
  
        booksList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any book!";
        booksList.classList.add("notFound");
      }
  
      booksList.innerHTML = html;
  
      const descriptionButtons =
        document.getElementsByClassName("description-btn");
  
      for (const button of descriptionButtons) {
        button.addEventListener("click", async () => {
          try {
            const bookId = button.dataset.id;
            const bookResponse = await fetch(
              `https://openlibrary.org${bookId}.json`
            );
            const bookData = await bookResponse.json();
  
            if (
              typeof bookData.description === "object" &&
              bookData.description !== null
            ) {
              bookDescriptionText.textContent =
                bookData.description.value || "No description available.";
            } else {
              bookDescriptionText.textContent =
                bookData.description || "No description available.";
            }
  
            bookDescription.parentElement.classList.add("showdescription");
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        });
      }
  
      descriptionCloseBtn.addEventListener("click", () => {
        bookDescription.parentElement.classList.remove("showdescription");
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });

/*


// searchButton.addEventListener("click", async () => {
//   try {
//     const category = searchInput.value;
//     const response = await fetch(
//       `https://openlibrary.org/subjects/${category}.json`
//     );
//     const data = await response.json();
//     booksList.innerHTML = "";

//     let html = "";
//     if (data.works) {
//       data.works.forEach((book) => {
//         html += `
//               <div class="book-item text-center" data-id="${book.id}">
//               <div class="book-img">
//                   <img src="${book.cover}" alt="">
//               </div>
//               <div class="book-name card">
//                   <h3 class="card-title" id="card-title">${book.title}</h3>
//                   <p>Author: ${book.authors[0].name}</p> 
//                   <button class="description-btn" data-id="${book.key}" id="get-description" >Get description</button>
//               </div>
//               </div> 
//                   `;
//       });

//       booksList.classList.remove("notFound");
//     } else {
//       html = "Sorry, we didn't find any book!";
//       booksList.classList.add("notFound");
//     }

//     booksList.innerHTML = html;

//     const descriptionButtons =
//       document.getElementsByClassName("description-btn");

//     for (const button of descriptionButtons) {
//       button.addEventListener("click", async () => {
//         try {
//           const bookId = button.dataset.id;
//           const bookResponse = await fetch(
//             `https://openlibrary.org${bookId}.json`
//           );
//           const bookData = await bookResponse.json();

//           if (
//             typeof bookData.description === "object" &&
//             bookData.description !== null
//           ) {
//             bookDescriptionText.textContent =
//               bookData.description.value || "No description available.";
//           } else {
//             bookDescriptionText.textContent =
//               bookData.description || "No description available.";
//           }

//           bookDescription.parentElement.classList.add("showdescription");
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       });
//     }

//     descriptionCloseBtn.addEventListener("click", () => {
//       bookDescription.parentElement.classList.remove("showdescription");
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// });







/*
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const booksList = document.getElementById("book");
const bookDescription = document.getElementById("book-description");
// const closeButton = document.querySelector(".close-button");

// closeButton.addEventListener("click", () => {
//   bookDescription.classList.remove("show");
// });

searchButton.addEventListener("click", async () => {
  const category = searchInput.value;
  const response = await fetch(
    `https://openlibrary.org/subjects/${category}.json`
  );
  const data = await response.json();
  booksList.innerHTML = "";

  let html = "";
  data.works.forEach((book) => {
    html += `
        <div class="book-item text-center" data-id="${book.id}">
        <div class="book-img">
            <img src="${book.cover}" alt="">
        </div>
        <div class="book-name card">
            <h3 class="card-title" id="card-title">${book.title}</h3>
            <p>Author: ${book.authors[0].name}</p> 
            <button class="description-btn" data-id="${book.key}" id="get-description" >Get description</button>
        </div>
        </div> 
        `;
    booksList.innerHTML = html;

    const descriptionButtons = document.getElementById("get-description");
    const description = document.getElementById("book-description");
    descriptionButtons.addEventListener("click", async () => {
    const bookId = description.dataset.id;
      const bookResponse = await fetch(
        `https://openlibrary.org${bookId}.json`
      );  
      const bookData = await bookResponse.json(); 
      bookDescriptionText.textContent = bookData.description || "No description available."; 
    //   bookTitle.textContent = bookData.title;
    //   bookAuthors.textContent = bookData.authors
    //     .map((author) => author.name)
    //     .join(", ");
    console.log(bookData.description);
      bookDescription.classList.add("show");
    });
    
  });
});
const bookTitle = document.getElementById("book-title");
const bookAuthors = document.getElementById("book-authors");
const bookDescriptionText = document.getElementById("book-description");

// closeButton.addEventListener("click", () => {
//   bookDescription.classList.remove("show");
// });

*/

//////////PROVA.HTML
// const searchButton = document.getElementById('search-btn');
// const searchInput = document.getElementById('search-input');
// const booksList = document.getElementById('books-list');
// const bookDescription = document.getElementById('book-description');
// const bookTitle = document.getElementById('book-title');
// const bookAuthors = document.getElementById('book-authors');
// const bookDescriptionText = document.getElementById('book-description');

// searchButton.addEventListener('click', async () => {
//     const category = searchInput.value;
//     const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
//     const data = await response.json();
//     booksList.innerHTML = '';

//     data.works.forEach(book => {
//         const listItem = document.createElement('li');
//         listItem.textContent = book.title;
//         listItem.addEventListener('click', async () => {
//             const bookResponse = await fetch(`https://openlibrary.org${book.key}.json`);
//             const bookData = await bookResponse.json();
//             bookTitle.textContent = bookData.title;
//             bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
//             bookDescriptionText.textContent = bookData.description;
//             bookDescription.style.display = 'block';
//         });
//         booksList.appendChild(listItem);
//     });
// });

// const searchButton = document.getElementById('search-btn');
// const searchInput = document.getElementById('search-input');
// const booksList = document.getElementById('books-list');
// const bookDescription = document.getElementById('book-description');
// const bookTitle = document.getElementById('book-title');
// const bookAuthors = document.getElementById('book-authors');
// const bookDescriptionText = document.getElementById('book-description');
// const closeButton = document.querySelector('.close-button');

// closeButton.addEventListener('click', () => {
//     bookDescription.classList.remove('show');
// });

// searchButton.addEventListener('click', async () => {
//     const category = searchInput.value;
//     const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
//     const data = await response.json();
//     booksList.innerHTML = '';

//     data.works.forEach(book => {
//         const listItem = document.createElement('li');
//         listItem.textContent = book.title;
//         listItem.addEventListener('click', async () => {
//             const bookResponse = await fetch(`https://openlibrary.org${book.key}.json`);
//             const bookData = await bookResponse.json();
//             bookTitle.textContent = bookData.title;
//             bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
//             bookDescriptionText.textContent = bookData.description;
//             bookDescription.classList.add('show');
//         });
//         booksList.appendChild(listItem);
//     });
// });

//////////////////////////////////////////////////////////

// searchButton.addEventListener('click', async () => {
//     const category = searchInput.value;
//     const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
//     const data = await response.json();
//     booksList.innerHTML = '';

//     data.works.forEach(book => {
//         const listItem = document.createElement('li');
//         listItem.textContent = book.title;
//         listItem.addEventListener('click', async () => {
//             const bookResponse = await fetch(`https://openlibrary.org${book.key}.json`);
//             const bookData = await bookResponse.json();
//             bookTitle.textContent = bookData.title;
//             bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
//             bookDescriptionText.textContent = bookData.description;
//             bookDescription.classList.add('show');
//         });
//         booksList.appendChild(listItem);
//     });
// });

/////////////////////////////
//get book list that matches with the category
// searchBtn.addEventListener("click", async () => {
//     const category = document.getElementById("search-input");
//     const searchInputTxt = category.value.trim();

//     const url = `https://openlibrary.org/subjects/${searchInputTxt}.json`;
//     const response = await fetch(url);
//     const data = await response.json();
//   console.log(data);

// let html = "";
// if (data.works) {
//   data.works.forEach((book) => {
//     html += `
//     <div class="book-item text-center" data-id="${book.id}">
//     <div class="book-img">
//         <img src="${book.cover}" alt="cover">
//     </div>
//     <div class="book-name">
//         <h3>${book.title}</h3>
//         <p>Author: ${book.authors[0].name}</p>
//         <a href="#" class="description-btn" id="description">Get description</a>
//     </div>
//     </div>
//     `;
//   });
//   bookList.classList.remove("notFound");
// } else {
//   html = "Sorry, we didn't find any book!";
//   bookList.classList.add("notFound");
// }
// bookList.innerHTML = html;

//get description of the book
//   bookList.addEventListener("click", async (e) => {
//       e.preventDefault();
//       if(e.target.classList.contains("description-btn")){
// const response = await fetch(`https://openlibrary.org/subjects/${searchInputTxt}.json`);
// const data = await response.json();
//   data.works.forEach(book => {
//       const description = document.getElementById('description');
//       const url2 = `https://openlibrary.org${book.key}.json`;
//       description.addEventListener('click', async () => {
//           const bookResponse = await fetch(url2).catch((error) => {
//               console.error("Error fetching data:", error)
//           });
//           const data = await bookResponse
//           .json()
//           .then(data => bookdescriptionModal(data.description))
// console.log(bookData);
// bookData => {bookdescriptionModal(bookData.description)}
//       });
//   });

//create a modal
//   function bookdescriptionModal(book){
//       console.log(book)
//       if(book){
//           book = book[0];
//           let html = `
//           <h2 class="description-title">${book.title}</h2>
//           <p class="description-category"></p>
//           <div class="description-book-img">
//               <img src="${data.cover}" alt="cover">
//           </div>
//           `;
//           bookDetailsContent.innerHTML = html;
//           bookDetailsContent.parentElement.classList.add('showDescription');
//       }

//   }

//close description modal
//           descriptionCloseBtn.addEventListener('click', () =>{
//               bookDetailsContent.parentElement.classList.remove('showDescription');
//           });
//       }

//   });

//   });
