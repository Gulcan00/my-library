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
    const grid = document.querySelector("div.grid-container");
    grid.replaceChildren();
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        const content = document.createElement("div");
        content.classList.add("card-content");
        content.setAttribute("data-book-id", index);
        card.classList.add("card");

        const imgPlaceholder = document.createElement("img");
        imgPlaceholder.alt = "Cover";
        imgPlaceholder.setAttribute("src", "https://picsum.photos/id/24/150/200");
        card.appendChild(imgPlaceholder);

        const header = document.createElement("div");
        header.classList.add("header");
        const title = document.createElement("h5");
        title.classList.add("primary-title");
        title.innerText = book.title;

        const status = document.createElement("div");
        status.innerText = book.read ? "Read" : "Not Read";
        status.classList.add("status");
        header.appendChild(title);
        header.appendChild(status);

        const author = document.createElement("h6");
        author.innerText = book.author;
        author.classList.add("secondary-title");

        const pages = document.createElement("div");
        pages.innerText = book.pages + " pages";


        content.appendChild(header);
        content.appendChild(author);
        content.appendChild(pages);

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");
        const toggleBtn = document.createElement("button");
        toggleBtn.addEventListener('click', toggleReadStatus);
        toggleBtn.innerText = "toggle_on";
        toggleBtn.classList.add("material-symbols-outlined");
        buttons.appendChild(toggleBtn);

        const deleteBtn = document.createElement("button");
        const icon = document.createElement("span");
        icon.classList.add("material-symbols-outlined");
        icon.innerText = "delete";
        deleteBtn.appendChild(icon);
        const text = document.createElement("span");
        text.innerText = "Delete";
        deleteBtn.appendChild(text);
        deleteBtn.classList.add("delete");
        deleteBtn.addEventListener('click', deleteBook);
        buttons.appendChild(deleteBtn);

        content.append(buttons);
        card.appendChild(content);
        grid.appendChild(card);
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

