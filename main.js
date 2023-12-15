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

    const title = document.getElementById('title');
    const author = document.getElementById('author');

    function setErrorMessages() {    
        if (title.validity.valueMissing) {
            title.setCustomValidity('Title is required');
        } else {
            title.setCustomValidity('');
        }
    
        
        if (author.validity.valueMissing) {
            author.setCustomValidity('Author is required');
        } else if (author.validity.patternMismatch) {
            author.setCustomValidity('Please enter either the author\'s first name, last name, or both.');
        } else {
            author.setCustomValidity('');
        }
    }

    title.addEventListener('input', setErrorMessages);
    author.addEventListener('input', setErrorMessages);
    
    const submitBtn = document.querySelector('#submit');
    
    submitBtn.addEventListener('click', (e) => {
        const form = document.querySelector('form');
        let formData = new FormData(form);
    
        if (form.checkValidity()) {
            e.preventDefault();
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
            setErrorMessages();
        }
    
    });

})()
