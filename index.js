const content = document.querySelector('.main-content');
const myForm = document.querySelector('.myForm');
const add = document.querySelector('.add');
const addBook = document.querySelector('.addBook');
const removeBook = document.querySelector('.remove');


let myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

Book.prototype = {
    setBook: function() {
        const myTitle = document.querySelector('#title').value;
        this.title = myTitle;
        const myAuthor = document.querySelector('#author').value;
        this.author = myAuthor;
        const myPages = document.querySelector('#pages').value;
        this.pages = myPages;
        const read = document.querySelector('#read').checked;
        this.haveRead = read;        
    },
    
    addBookToLibraryArr: function() {
        let newBook = new Book(this.title, this.author, this.pages, this.haveRead);
        myLibrary.push(newBook);
    }
    
}




function bringUpForm(event) {
    event.preventDefault();
    myForm.classList.toggle('visible');
    if (myForm.classList.contains('visible')) {
        add.textContent = 'cancel';
    }

    if (!myForm.classList.contains('visible')) {
        add.textContent = 'add';
    }
}

function closeForm() {
    myForm.classList.remove('visible');
}

function addBookToLibrary(event) {
    event.preventDefault();
    Book.prototype.setBook();
    Book.prototype.addBookToLibraryArr();
    closeForm();
    renderEl();
}

let indexPosition = 0;

function removeEle(event) {
   let isItRemoveButton = event.target;
   if (isItRemoveButton.tagName === 'BUTTON' && isItRemoveButton.classList.contains('remove')) {
    let parentEle = isItRemoveButton.parentElement.parentElement;
    removePosition = isItRemoveButton.parentElement.parentElement.getAttribute('data-listing');
    removePosition = Number(removePosition);
    myLibrary.splice(removePosition, 1);
    parentEle.remove();
    indexPosition--;
   }
}

function changeEle(event) {
    let isItChangeButton = event.target;
    if (isItChangeButton.tagName === 'BUTTON' && isItChangeButton.classList.contains('change')) {
        let changePosition = isItChangeButton.parentElement.getAttribute('data-Listing');
        changePosition = Number(changePosition);
        if (myLibrary[changePosition].haveRead === true) {
            myLibrary[changePosition].haveRead = false;
        } else {
            myLibrary[changePosition].haveRead = true;
        }

        if (myLibrary[changePosition].haveRead === true) {
            isItChangeButton.parentElement.parentElement.children[3].children[0].textContent = 'Yes';            
        } else {
            isItChangeButton.parentElement.parentElement.children[3].children[0].textContent = 'No';
        }
    }
}


function renderEl() {

  
   for (let i = indexPosition; i < myLibrary.length; i++) {
    const myEl = document.createElement('div');
    myEl.classList.add('card');
    
    const cardTitle = document.createElement('p');
    cardTitle.textContent = 'Title: ';
    const titleSpan = document.createElement('span');
    titleSpan.textContent = myLibrary[i].title;
    cardTitle.append(titleSpan);
    myEl.append(cardTitle);

    const cardAuthor = document.createElement('p');
    cardAuthor.textContent = 'Author: ';
    const authorSpan = document.createElement('span');
    authorSpan.textContent = myLibrary[i].author;
    cardAuthor.append(authorSpan);
    myEl.append(cardAuthor);

    const cardPages = document.createElement('p');
    cardPages.textContent = 'Pages: ';
    const pagesSpan = document.createElement('span');
    pagesSpan.textContent = myLibrary[i].pages;
    cardPages.append(pagesSpan);
    myEl.append(cardPages);

    const cardRead = document.createElement('p');
    cardRead.textContent = 'Read: ';
    const readSpan = document.createElement('span');
   
    if (myLibrary[i].haveRead === true) {
        readSpan.textContent = 'Yes';
    } else {
        readSpan.textContent = 'No';
    }

    cardRead.append(readSpan);
    myEl.append(cardRead);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');
    myEl.append(buttonContainer);
    
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove');
    removeButton.textContent = 'Remove';
    buttonContainer.append(removeButton);

    const changeButton = document.createElement('button');
    changeButton.classList.add('change');
    changeButton.textContent = 'Change Read Status';
    buttonContainer.append(changeButton);
    
    myEl.dataset.listing = `${indexPosition++}`;
    

    content.append(myEl);

   }

}

add.addEventListener('click', bringUpForm);
addBook.addEventListener('click', addBookToLibrary);
document.addEventListener('click', removeEle);
document.addEventListener('click', changeEle);


