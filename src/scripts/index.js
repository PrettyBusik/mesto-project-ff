import './../pages/index.css';
import {showPopupCard, closeCurrentPopup, openPopup} from "./popup";
import {fillEditingForm,subscribeToEditingFormSubmitting, subscribeToAddingFormSubmitting} from "./forms";
import {addCard} from "./cards";
const popupEdit= document.querySelector('.popup_type_edit');
const popupAdding= document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');



const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');

popups.forEach(function (popup) {
    popup.addEventListener('mousedown', function (event) {
        if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
            closeCurrentPopup();
        }
    })
})

//Форма редактирования
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    openPopup(popupEdit);
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText)

});

function handleFormSubmitForEditing(newName, newJob) {
    nameOfUserInPage.textContent = newName;
    descriptionOfUserInPage.textContent = newJob;
    closeCurrentPopup();
}

subscribeToEditingFormSubmitting( handleFormSubmitForEditing);


// Форма создания
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click',  ()=>{
    openPopup(popupAdding)
});

function handleFormSubmitForAddingCard(nameOfPlace, imgLink) {
    addCard(nameOfPlace, imgLink);
    closeCurrentPopup();
}

subscribeToAddingFormSubmitting(handleFormSubmitForAddingCard);








