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