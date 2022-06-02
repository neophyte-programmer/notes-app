// VARIABLES & QUERY SELECTORS
const addBox = document.querySelector('.add__box')
const popupBox = document.querySelector('.popup__box')
const popupClose = document.querySelector('.popup__close')
const addBtn = document.querySelector('.popup__btn')
const inputTitle = document.querySelector('.popup__title')
const inputDescription = document.querySelector('.popup__description')

// EVENT LISTENERS

// Show Popup
addBox.addEventListener('click', () => {
	popupBox.classList.toggle('show__popup')
})

// Close Popup
popupClose.addEventListener('click', () => {
	popupBox.classList.remove('show__popup')
})

// Add Item
addBtn.addEventListener('click', (e) => {
	e.preventDefault() // Prevent default form submit

	// Get input values
	const noteTitle = inputTitle.value
	const noteDescription = inputDescription.value

	// Check for input
	if (noteTitle === '' || noteDescription === '') {
		// Error alert
		alert('Please add a title and description')
	} else {
		// Object to store note details
		const noteInfo = {
			title: noteTitle,
			description: noteDescription,
			date: getCurrentDate(),
		}
        console.log(noteInfo)
        storeNote(noteInfo)
        popupClose.click()
	}
})

// FUNCTIONS

// Get current date
const getCurrentDate = () => {
	const currentDate = new Date()
	const day = currentDate.getDate()
	const month = currentDate.getMonth() + 1
	const year = currentDate.getFullYear()

	// Assign month numbers to string
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const monthString = months[month - 1]

	// Format date
	const date = `${monthString} ${day}, ${year}.`
	// console.log(date);
	return date
}

// Get local storage notes if available or set to empty array
const notes = JSON.parse(localStorage.getItem('notes')) || []

// Store note in local storage
const storeNote = (input) => {
	notes.push(input) // Push note info to notes array
    console.log(notes)
	localStorage.setItem('notes', JSON.stringify(notes))
}

// Show notes
const showNotes = () => {
    notes.forEach((note) => {
        console.log(note)
        console
        let noteTemplate = `<div class="box note">
        <div class="note__details">
            <p class="note__title"> ${note.title} </p>
            <span class="note__description">
            ${note.description}
            </span>
        </div>
        <div class="note__options">
            <span class="note__date">${note.date}</span>
            <div class="note__settings">
                <i class="uil uil-ellipsis-h note__settings-icon"></i>
                <ul class="note__settings-menu">
                    <li class="menu__item"><i class="uil uil-pen menu__icon icon__edit"></i>Edit</li>
                    <li class="menu__item"><i class="uil uil-trash menu__icon icon__trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    </div>`
        addBox.insertAdjacentHTML('afterend', noteTemplate)
    })
}

showNotes()