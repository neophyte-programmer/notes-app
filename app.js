// VARIABLES & QUERY SELECTORS
const addBox = document.querySelector('.add__box');
const popupBox = document.querySelector('.popup__box');
const popupClose = document.querySelector('.popup__close');
const addBtn = document.querySelector('.popup__btn');
const inputTitle = document.querySelector('.popup__title');
const inputDescription = document.querySelector('.popup__description');

// Get input values
const noteTitle = inputTitle.value;
const noteDescription = inputDescription.value;

// Object to store note details
const noteInfo = {
    title: noteTitle,
    description: noteDescription,
    date: getCurrentDate()
};


// EVENT LISTENERS

// Show Popup
addBox.addEventListener('click', () => {
    popupBox.classList.toggle('show__popup');
});

// Close Popup
popupClose.addEventListener('click', () => {
    popupBox.classList.remove('show__popup');
});

// Add Item
addBtn.addEventListener('click', e => {
    e.preventDefault(); // Prevent default form submit
    
    // Check for input
    if (noteTitle === '' || noteDescription === '') {
        // Error alert
        alert('Please add a title and description');
    } else {
        console.log(noteTitle, noteDescription);
        console.log(noteInfo);
    }

});

// FUNCTIONS

// Get current date
const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Assign month numbers to string
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthString = months[month - 1];

    // Format date
    const date = `${monthString} ${day}, ${year}.`;
    // console.log(date);
    return date;
}

 

// Store note in local storage
const storeNote = (noteInfo) => {

}


