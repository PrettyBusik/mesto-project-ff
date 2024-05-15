import './../pages/index.css';
import {showPopupEditing,showPopupAdding,showPopupCard, closeCurrentPopup} from "./popup";
import {fillEditingForm,subscribeToEditingFormSubmitting, subscribeToAddingFormSubmitting} from "./forms";
import {addCard} from "./cards";

const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');


//Форма редактирования
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText)
    showPopupEditing();
});

function handleFormSubmitForEditing(newName, newJob) {
    nameOfUserInPage.textContent = newName;
    descriptionOfUserInPage.textContent = newJob;
    closeCurrentPopup();
}

subscribeToEditingFormSubmitting( handleFormSubmitForEditing);


// Форма создания
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click',  showPopupAdding);

function handlerFormSubmitForAddingCard(cityName, imgLink) {
    const newCard = {
        name: cityName,
        link: imgLink
    }
    addCard(newCard.name, newCard.link);
    closeCurrentPopup();
}

subscribeToAddingFormSubmitting(handlerFormSubmitForAddingCard);








