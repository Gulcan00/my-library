// function Book(title, author, pages, read = false) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read
// }

class Book {
    constructor (title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function createLibrary() {
    const books = [new Book("title1", "john", 9)];

    const toggleReadStatus = (index) => {
        books[index].read = !books[index].read;
    }

    const getBooks = () => books;

    const removeBook = (index) => books.splice(index, 1);

    const addBook = (book) => books.push(book);

    return {
        getBooks,
        toggleReadStatus,
        removeBook,
        addBook
    }
}


(function displayController() {
    const library = createLibrary();
    const grid = document.querySelector("div.grid-container");

    function handleToggleClick(e) {
        const index = e.target.parentNode.parentNode.getAttribute("data-book-id");
        library.toggleReadStatus(index);
        displayBooks();
    }
    
    function deleteBook(e) {
        const index = e.target.parentNode.parentNode.getAttribute("data-book-id");
        library.removeBook(index);
        displayBooks();
    }
    
    function displayBooks() {
        grid.replaceChildren();
        const books = library.getBooks();
        books.forEach((book, index) => {
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

            //Title
            const title = document.createElement("h5");
            title.classList.add("primary-title");
            title.innerText = book.title;
            title.setAttribute("title", book.title);
            header.appendChild(title);
    
            //Read status
            const status = document.createElement("div");
            status.innerText = book.read ? "Read" : "Not Read";
            status.classList.add("status");
            header.appendChild(status);
            
            content.appendChild(header);
            
            //Author
            const author = document.createElement("h6");
            author.innerText = book.author;
            author.classList.add("secondary-title");
            content.appendChild(author);

            const pages = document.createElement("div");
            pages.innerText = `${book.pages} pages`;
            content.appendChild(pages);
    
            const buttons = document.createElement("div");
            buttons.classList.add("buttons");
            const toggleBtn = document.createElement("button");
            toggleBtn.addEventListener('click', handleToggleClick);
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
        e.preventDefault();
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
            library.addBook(book);
            form.reset();
            modal.close();
            displayBooks();
        } else {
            const title = document.getElementById('title');
            const titleError = document.querySelector('label[for="title"] > span.error');
            const author = document.getElementById('author');
            const numPages = document.getElementById('num-pages');
            const read = document.querySelector('radio');

            if (title.validity.valueMissing) {
                titleError.innerHTML = '<svg class="error-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alert-circle</title><path d="M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg> Please enter a title';
            } else {
                titleError.innerHTML = null;
            }

        }
    
    });

})()
