import './../pages/index.css';
import {showPopupCard, closeCurrentPopup, openPopup} from "./popup";
import {fillEditingForm, subscribeToEditingFormSubmitting, subscribeToAddingFormSubmitting} from "./forms";
import {addCard} from "./cards";
import {enableValidation, clearValidation} from "./validation";
import {getInfoAboutUser, getAllCards, saveEditingInProfile, postNewCard} from "./api";

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdding = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');


const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');

let myId;


const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

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
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText);
    clearValidation(popupEdit.querySelector('.popup__form'), config);

});

function handleFormSubmitForEditing(newName, newJob) {
    nameOfUserInPage.textContent = newName;
    descriptionOfUserInPage.textContent = newJob;
    updateProfile;
    closeCurrentPopup();
}

subscribeToEditingFormSubmitting(handleFormSubmitForEditing);


// Форма создания
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    openPopup(popupAdding);
});

function handleFormSubmitForAddingCard(nameOfPlace, imgLink) {
    addCard(nameOfPlace, imgLink);
    postNewCard(nameOfPlace, imgLink).then(res => console.log(res.status));
    closeCurrentPopup();
    clearValidation(popupAdding.querySelector('.popup__form'), config);
}

subscribeToAddingFormSubmitting(handleFormSubmitForAddingCard);


enableValidation(config);


Promise.all([getInfoAboutUser(), getAllCards()])
    .then(([user, allCards]) => {
        fillEditingForm(user.name, user.about);
        handleFormSubmitForEditing(user.name, user.about);
        myId = user._id;

        allCards.forEach((card) => {
            // const isMyCard = myId === card.owner._id;
            let isMyCard= false;
            let idCard = '';
            if (myId === card.owner._id){
                isMyCard= true;
                idCard = card._id;
                console.log( "передает  "+idCard)
            }
            addCard(card.name, card.link, card.likes.length, isMyCard, idCard);

        })

    })

const updateProfile = saveEditingInProfile(nameOfUserInPage.innerText, descriptionOfUserInPage.innerHTML)
    .then(res => {
    })








