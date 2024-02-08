import "../css/style.css";
// require('dotenv').config();



searchButton.addEventListener('click', async () => {
  const category = searchInput.value;
  const response = await fetch(`https://openlibrary.org/subjects/${category}.json`);
  const data = await response.json();
  booksList.innerHTML = '';

  let html = "";
  if (data.works) {
    data.works.forEach((book) => {
      html += `
      <div class="book-item text-center" data-id="${book.id}">
      <div class="book-img">
          <img src="${book.cover}" alt="cover">
      </div>
      <div class="book-name">
          <h3>${book.title}</h3>
          <p>Author: ${book.authors[0].name}</p> 
          <button class="description-btn" id="get-description" data-key="${book.key}">Get description</button>
      </div>
      </div> 
      `; 
    });

  }
    //   bookList.classList.remove("notFound");
  // } else {
  //   html = "Sorry, we didn't find any book!";
  //   bookList.classList.add("notFound");
  // }
  // bookList.innerHTML = html;


  // booksList.innerHTML = '';

  // data.works.forEach(book => {
  //     const listItem = document.createElement('li');
  //     listItem.textContent = book.title;
  //     listItem.addEventListener('click', async () => {
  //         const bookResponse = await fetch(`https://openlibrary.org${book.key}.json`);
  //         const bookData = await bookResponse.json();
  //         bookTitle.textContent = bookData.title;
  //         bookAuthors.textContent = bookData.authors.map(author => author.name).join(', ');
  //         bookDescriptionText.textContent = bookData.description;
  //         bookDescription.classList.add('show');
  //     });
  //     booksList.appendChild(listItem);
  // });
});

// const searchBtn = document.getElementById("search-btn");
// const bookList = document.getElementById("book");
// const bookDetailsContent = document.querySelector(".book-details-content");
// const descriptionCloseBtn = document.getElementById("description-close-btn");


//get book list that matches with the category
searchBtn.addEventListener("click", async () => {
  const category = document.getElementById("search-input");
  const searchInputTxt = category.value.trim();

  const url = `https://openlibrary.org/subjects/${searchInputTxt}.json`;
  const response = await fetch(url);
  const data = await response.json();

  let html = "";
  if (data.works) {
    data.works.forEach((book) => {
      html += `
      <div class="book-item text-center" data-id="${book.id}">
      <div class="book-img">
          <img src="${book.cover}" alt="cover">
      </div>
      <div class="book-name">
          <h3>${book.title}</h3>
          <p>Author: ${book.authors[0].name}</p> 
          <button class="description-btn" id="get-description" data-key="${book.key}">Get description</button>
      </div>
      </div> 
      `; 
    });

  }
  //   bookList.classList.remove("notFound");
  // } else {
  //   html = "Sorry, we didn't find any book!";
  //   bookList.classList.add("notFound");
  // }
  // bookList.innerHTML = html;

  //get description of the book
//   bookList.addEventListener("click", async (e) => {
//     e.preventDefault();
//     if (e.target.classList.contains("description-btn")) {
//       const bookKey = e.target.dataset.key;
//       const url2 = `https://openlibrary.org${bookKey}.json`;

//       try {
//         const bookResponse = await fetch(url2);
//         const bookData = await bookResponse.json();
//         bookdescriptionModal(bookData.description);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }
//   });
});

//create a modal
// function bookdescriptionModal(book) {
//   if (book) {
//     const html = `
//       <h2 class="description-title">${book.title}</h2>
//       <div class="description-book-img">
//           <img src="" alt="cover">
//       </div>
//       <p class="description-description">${book.description}</p>
//     `;
//     bookDetailsContent.innerHTML = html;
//     bookDetailsContent.parentElement.classList.add('showDescription');
//   }
// }

//close description modal
// descriptionCloseBtn.addEventListener('click', () => {
//   bookDetailsContent.parentElement.classList.remove('showDescription');
// });



//get description of the book
// bookList.addEventListener("click", async (e) => {
//     e.preventDefault();
//     if(e.target.classList.contains("description-btn")){
//         const response = await fetch(`https://openlibrary.org/subjects/${searchInputTxt}.json`);
//         const data = await response.json();
//         data.works.forEach(book => {
//             const description = document.getElementById('description');
//             const url2 = `https://openlibrary.org${book.key}.json`;
//             description.addEventListener('click', async () => {
//                 const bookResponse = await fetch(url2).catch((error) => {
//                     console.error("Error fetching data:", error)
//                 });
//                 const data = await bookResponse
//                 .json()
//                 .then(data => mealRecipeModal(data.meals))
                // console.log(bookData);
                // bookData => {bookdescriptionModal(bookData.description)}
        //     });
        // });
          
        //create a modal
        // function bookdescriptionModal(book){
        //     console.log(book)
        //     book = book[0];
        //     let html = `
        //     <h2 class="description-title">${book.title}</h2>
        //     <p class="description-category">${book.key[0].value}</p>
        //     <div class="description-book-img">
        //         <img src="${book.cover}" alt="cover">
        //     </div>
        //     `;
        //     bookDetailsContent.innerHTML = html;
        //     bookDetailsContent.parentElement.classList.add('showDescription');
        // }
    
        //close description modal
    //     descriptionCloseBtn.addEventListener('click', () =>{
    //         bookDetailsContent.parentElement.classList.remove('showDescription');
    //     });
    // }

    
  
// });




// async (e) => {
//   e.preventDefault();
//   if (e.target.classList.contains("description-btn")) {
//     const bookItem = e.target.parentElement.parentElement;
//     const url2 = `https://openlibrary.org${book.key}.json`;

//     const response = await fetch(url2).catch((error) =>
//       console.error("Error fetching data:", error)
//     );

//     const data = await response
//       .json()
//       console.log(data);
    //   .then(data => bookdescriptionModal(data.books))
    //   .catch((error) => console.error("Error parsing JSON:", error));
































































/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import axios from "axios";


// const searchInput = document.getElementById('search-input');
// const searchButton = document.getElementById('search-button');
// const booksContainer = document.getElementById('books-container');



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
//                 key: book.key
//                 // image: book.cover
//             }));
//             displayBooks(books);
//         })
//         .catch(error => {
//             console.error('Error fetching books:', error);
//         })
// }


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


// function displayBooks(books) {
//     booksContainer.innerHTML = '';
//     books.forEach(book => {
//       const bookCard = document.createElement('div');
//       bookCard.className = 'book-card';
//       bookCard.innerHTML = `
//         <img src="${book.cover}" alt="${book.title}">
//         <h3 title="${book.title}" id="book-title-${book.key}">${book.title}</h3>
//         <p>Author: ${book.author}</p>
//         <button data-key="${book.key}" id="book-description">Read more</button>
//       `;
//       booksContainer.appendChild(bookCard);
  
      // Add event listener instead of onclick attribute
//       document.getElementById('book-description').addEventListener('click', () => {
//         displayBookDescription(book.key);
//       });
//     });
//   }
  
//   function displayBookDescription(bookId) {
//     axios.get(`https://openlibrary.org/works/${bookId}.json`)
//       .then(response => {
//         const book = response.data;
//         const bookDescription = document.createElement('div');
//         bookDescription.innerHTML = `
//           <p>Title: ${book.title}</p>
//           <p>Author: ${book.author_name}</p>
//           <p>Description: ${book.description}</p>
//         `;
//         booksContainer.appendChild(bookDescription);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }



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
    
























































































































































































































