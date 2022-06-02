// VARIABLES & QUERY SELECTORS
const addBox = document.querySelector('.add__box')
const popupBox = document.querySelector('.popup__box')
const popupClose = document.querySelector('.popup__close')
const popupTitle = document.querySelector('.heading')
const addBtn = document.querySelector('.popup__btn')
const inputTitle = document.querySelector('.popup__title')
const inputDescription = document.querySelector('.popup__description')

let isEdited = false, updateIndex

// EVENT LISTENERS

// Show Popup
addBox.addEventListener('click', () => {
    inputTitle.focus() // Focus on title input
	popupBox.classList.toggle('show__popup')
})

// Close Popup
popupClose.addEventListener('click', () => {
    isEdited = false
    inputTitle.value = ''
    inputDescription.value = ''
    addBtn.innerText = 'Add Note'
    popupTitle.innerText = 'Add A New Note'
    document.location.reload()
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
        // Check if note is being edited
        if (!isEdited) {
            pushNote(noteInfo)
        } else {
            isEdited = false
            notes[updateIndex] = noteInfo // update specified note
        }

        storeNote()
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

// Push note info to notes array
const pushNote = (note) => {
    notes.push(note)
}

// Store note in local storage
const storeNote = () => {
	localStorage.setItem('notes', JSON.stringify(notes))
}

// Show notes
const showNotes = () => {
    // Remove duplicate notes by removing previous notes before adding new ones
    document.querySelectorAll(".note").forEach(note => note.remove());

	notes.forEach((note, index) => {
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
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h note__settings-icon"></i>
                <ul class="note__settings-menu">
                    <li onclick="editNote(${index}, '${note.title}', '${note.description}')" class="menu__item"><i class="uil uil-pen menu__icon icon__edit"></i>Edit</li>
                    <li onclick="deleteNote(${index})" class="menu__item"><i class="uil uil-trash menu__icon icon__trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    </div>`
		addBox.insertAdjacentHTML('afterend', noteTemplate)
	})
}

// Show Menu
const showMenu = (element) => {
    element.parentElement.classList.toggle('show__menu')
    // Remove menu when menu item is clicked
    document.querySelectorAll('.menu__item').forEach(item => {
        item.addEventListener('click', () => {
            element.parentElement.classList.remove('show__menu')
        })
    })

    // Remove menu item when clicked outside menu
    document.addEventListener('click', (e) => {
        if (!element.parentElement.contains(e.target)) {
            element.parentElement.classList.remove('show__menu')
        }
    })
    
}

// Delete note
const deleteNote = (index) => {
    // Confirm delete
    if (confirm('Are you sure you want to delete this note?')) {
        notes.splice(index, 1)
        storeNote()
        document.location.reload()
    }
}

// Edit note
const editNote = (index, title, description) => {
    isEdited = true
    updateIndex = index
    // Show popup
    addBox.click()
    // Change Title
    addBtn.innerText = 'Edit '
    popupTitle.innerText = 'Edit Note'
    // Auto fill form
    inputTitle.value = title
    inputDescription.value = description

}



// Main function
const main = () => {
    showNotes()
}

main()