import './../pages/index.css';
import {showPopupEditing,showPopupAdding,showPopupCard, closeCurrentPopup} from "./popup";
import {fillEditingForm,subscribeToEditingFormSubmitting, subscribeToAddingFormSubmitting} from "./forms";
import {addCard} from "./cards";


const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText)
    showPopupEditing();
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click',  showPopupAdding);

const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');


function handleFormSubmitForEditing(newName, newJob) {

    nameOfUserInPage.textContent = newName;
    descriptionOfUserInPage.textContent = newJob;
    closeCurrentPopup();
}

// Прикрепляем обработчик к форме:
subscribeToEditingFormSubmitting( handleFormSubmitForEditing);


function handlerFormSubmitForAddingCard(cityName, imgLink) {
    const newCard = {
        name: cityName,
        link: imgLink
    }
    addCard(newCard.name, newCard.link);

    closeCurrentPopup();
}

subscribeToAddingFormSubmitting(handlerFormSubmitForAddingCard);



