// Variable // Query Selectors
const addBox = document.querySelector('.add__box');
const popupBox = document.querySelector('.popup__box');

// Event Listeners

// Show Popup
addBox.addEventListener('click', () => {
    popupBox.classList.toggle('show__popup');
});

// Functions