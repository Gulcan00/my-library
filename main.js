const myLibrary = [{ title: "title1", author: "john", pages: 9, read: false }];

function Book(title, author, pages, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function toggleReadStatus(e) {
    const index = e.target.parentNode.getAttribute("data-book-id");
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

function deleteBook(e) {
    const index = e.target.parentNode.getAttribute("data-book-id");
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
        card.classList.add("card");
        card.setAttribute("data-book-id", index);
        const imgPlaceholder = document.createElement("img");
        imgPlaceholder.alt = "Cover";
        card.appendChild(imgPlaceholder);
        const title = document.createElement("div");
        title.innerText = book.title;
        const author = document.createElement("div");
        author.innerText = book.author;

        const pages = document.createElement("div");
        pages.innerText = book.pages + " pages";

        const status = document.createElement("div");
        status.innerText = book.read ? "Read" : "Not Read";
        status.classList.add("status");
                    card.appendChild(title);
                    card.appendChild(author);
                    card.appendChild(pages);
                    card.appendChild(status);
                const toggleBtn = document.createElement("button");
                toggleBtn.addEventListener('click', toggleReadStatus);
                toggleBtn.innerText = "toggle_on";
                toggleBtn.classList.add("material-symbols-outlined");
                card.appendChild(toggleBtn);
                // const toggleDiv = document.createElement("div");
                // toggleDiv.appendChild(toggleBtn);
        
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
                card.appendChild(deleteBtn);
                // const delDiv = document.createElement("div");
                // delDiv.appendChild(deleteBtn);
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

