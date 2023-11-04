const myLibrary = [{ title: "title1", author: "john", pages: 9, read: false }];

function Book(title, author, pages, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function toggleReadStatus(e) {
    const index = e.target.parentNode.parentNode.getAttribute("data-book-id");
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

function deleteBook(e) {
    const index = e.target.parentNode.parentNode.getAttribute("data-book-id");
    myLibrary.splice(index, 1);
    displayBooks();
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const tableBody = document.querySelector("tbody");
    tableBody.replaceChildren();
    myLibrary.forEach((book, index) => {
        const row = tableBody.insertRow();
        row.setAttribute("data-book-id", index);
        for (let property in book) {
            const cell = row.insertCell();
            if (property === "read") {
                cell.innerText = book[property] ? "Read" : "Not Read";
            } else {
                cell.innerText = book[property];
            }
        }

        const toggleBtn = document.createElement("button");
        toggleBtn.addEventListener('click', toggleReadStatus);
        toggleBtn.innerText = "toggle_on";
        toggleBtn.classList.add("material-symbols-outlined");
        
        const toggleCell = row.insertCell();
        toggleCell.appendChild(toggleBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "delete";
        deleteBtn.classList.add("material-symbols-outlined", "delete");
        deleteBtn.addEventListener('click', deleteBook);

        const delCell = row.insertCell();
        delCell.appendChild(deleteBtn);
    });
}

displayBooks();

const addBookBtn = document.querySelector("#add-book");
const modal = document.querySelector("dialog");

addBookBtn.addEventListener('click', () => modal.showModal());

const cancelBtn = document.querySelector('#cancel');
cancelBtn.addEventListener('click', () => modal.close());

const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (e) => {
    const form = document.querySelector('form');
    let formData = new FormData(form);

    if (form.checkValidity()) {
        let values = [];
        for (const pair of formData.entries()) {
            if (pair[0] === "read") {
                values.push(pair[1] === "true");
            } else {
                values.push(pair[1]);
            }
        }
        const book = new Book(...values);
        addBookToLibrary(book);
        form.reset();
        modal.close();
        e.preventDefault();
    }
    
});

