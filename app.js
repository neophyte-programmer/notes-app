// VARIABLES & QUERY SELECTORS
const addBox = document.querySelector('.add__box');
const popupBox = document.querySelector('.popup__box');
const popupClose = document.querySelector('.popup__close');

// EVENT LISTENERS

// Show Popup
addBox.addEventListener('click', () => {
    popupBox.classList.toggle('show__popup');
});

// Close Popup
popupClose.addEventListener('click', () => {
    popupBox.classList.remove('show__popup');
});

// FUNCTIONS

