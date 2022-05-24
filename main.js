const BASE_URL = "https://ptf-web-dizajn-2022.azurewebsites.net";

let books = [];
let authors = [];

fetch(`${BASE_URL}/books`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    books = data;
    renderBooks(data);
  });
fetch(`${BASE_URL}/authors`)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    authors = data;
    renderAuthors(data);
  });
const renderBooks = (books) => {
  const booksRow = document.getElementById("books-row");

  let resultBooksHtml = "";

  books.forEach((book) => {
    resultBooksHtml += `
        <div class="card mx-2 my-4" style="width: 18rem;">
            <img src="${book.image}" class="card-img-top my-1" alt="...">
            <div class="card-body">
                <h5 class="card-title">${book.name}</h5>
                <p class="card-text">${book.author.name} </p>
                <p class="card-text">Genre: ${book.genre}</p>
                <button id="add-favorites-button" type="button" class="btn btn-primary" onclick="getElementById('${book.id}')">
                <i class="bi bi-bookmark-heart"></i>
                </button>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editBook('${book.id}')">Uredi</button>
                <button type="button" onclick="deleteBook('${book.id}')" class="btn btn-danger">Izbriši</button>
            </div>
        </div>
        `;
  });
  booksRow.innerHTML = resultBooksHtml;
};

let dropDownListUpdate = document.getElementById("dropdownAuthorsSec");
let dropDownLists = document.getElementById("dropdownAuthors");

const renderAuthors = (authors) => {
  //popunjavanje drop down liste (za update Modal i add Book Modal)
  let dropDownListHtml = " ";
  authors.forEach((author) => {
    dropDownListHtml += `
     <option value="${author.id}">${author.name}</option>`;
  });
  dropDownLists.innerHTML = dropDownListHtml;
  dropDownListUpdate.innerHTML = dropDownListHtml;
};

let addBookForm = document.getElementById("add-book-form");

addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target[0].value); //naslov
  console.log(e.target[1].value); //zanr
  console.log(e.target[2].value); //slika
  console.log(e.target[3].value); //id autora
  fetch(`${BASE_URL}/books`, {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({
      name: String(e.target[0].value),
      genre: String(e.target[1].value),
      image: String(e.target[2].value),
      authorId: String(e.target[3].value),
    }),
  }).then((res) => {
    console.log(res);
  });
});

let bookIDInput = document.getElementById("bookId");
let nameIDInput = document.getElementById("nameId");
let genreIDInput = document.getElementById("genreId");
let pictureIDInput = document.getElementById("pictureId");
let authorIDInput = document.getElementById("dropdownAuthorsSec");

const editBook = (bookId) => {
    //Popunjavanje Modala u updateu (da je sve upisano unutar vec sa podacima o knjizi)
    fetch(`${BASE_URL}/books/${String(bookId)}`)
      .then((response) => response.json())
      .then((data) => {
        bookIDInput.defaultValue = `${bookId}`;
        nameIDInput.defaultValue = `${data.name}`;
        genreIDInput.defaultValue = `${data.genre}`;
        pictureIDInput.defaultValue = `${data.image}`;
        authors.forEach((author, index) => {
          if (author.id == data.authorId) {
            dropDownListUpdate.selectedIndex = index;
          }
        });
      });
  };
  let editForm = document.getElementById("edit-book-form");
  editForm.addEventListener("submit", (e) => {
    //Kad se submita Update forma (PUT)
    e.preventDefault();
    console.log("SUMBITALOSE");
    fetch(`${BASE_URL}/books`, {
      method: "PUT",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify({
        bookId: String(e.target[0].value),
        name: String(e.target[1].value),
        genre: String(e.target[2].value),
        image: String(e.target[3].value),
        authorId: String(e.target[4].value),
      }),
    }).then((res) => {
      console.log(res);
    });
  });