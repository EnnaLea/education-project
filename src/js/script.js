import "../css/style.css";

//results with cards

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const booksList = document.getElementById("book");
const bookDescription = document.getElementById("book-details-content");

const descriptionCloseBtn = document.getElementById("description-close-btn");

const bookDescriptionText = document.getElementById("book-description");

// const closeButton = document.querySelector(".description-close-btn");

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
  });
    booksList.innerHTML = html;

    const descriptionButtons = document.getElementsByClassName("description-btn");

    for (const button of descriptionButtons) {
      button.addEventListener("click", async () => {
        const bookId = button.dataset.id;
        const bookResponse = await fetch(`https://openlibrary.org${bookId}.json`);
        const bookData = await bookResponse.json();

        if (typeof bookData.description === 'object' && bookData.description !== null) {
            bookDescriptionText.textContent = bookData.description.value || "No description available.";
            console.log(bookData.description);
        } else {
            bookDescriptionText.textContent = bookData.description || "No description available.";
            console.log(bookData.description);
        }
        
        bookDescription.parentElement.classList.add("showdescription");
      });
    }
    


  descriptionCloseBtn.addEventListener('click', () =>{
    bookDescription.parentElement.classList.remove('showdescription');
});

});













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
