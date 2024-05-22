import './../pages/index.css';
import {showPopupCard, closeCurrentPopup, openPopup} from "./popup";
import {fillEditingForm,subscribeToEditingFormSubmitting, subscribeToAddingFormSubmitting} from "./forms";
import {addCard} from "./cards";
import {enableValidation, clearValidation} from "./validation";
import {getInfoAboutUser, getCards, saveEditingInProfile, postNewCard} from "./api";

const popupEdit= document.querySelector('.popup_type_edit');
const popupAdding= document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const amountOfLikesElement=document.querySelectorAll('.card__Likes-amount');


const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');

const config= {
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
     clearValidation(popupEdit.querySelector('.popup__form'),config);

});

function handleFormSubmitForEditing(newName, newJob) {
    nameOfUserInPage.textContent = newName;
    descriptionOfUserInPage.textContent = newJob;
    updateProfile;
    closeCurrentPopup();
}

subscribeToEditingFormSubmitting( handleFormSubmitForEditing);


// Форма создания
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click',  ()=>{
    openPopup(popupAdding);
});

function handleFormSubmitForAddingCard(nameOfPlace, imgLink) {
    addCard(nameOfPlace, imgLink);
    postNewCard(nameOfPlace, imgLink).then(res=> console.log(res.status));
    closeCurrentPopup();
    clearValidation(popupAdding.querySelector('.popup__form'),config);
}

subscribeToAddingFormSubmitting(handleFormSubmitForAddingCard);


enableValidation(config);

 const userInfo= getInfoAboutUser()
     .then((user)=>{
         fillEditingForm(user.name, user.about);
         handleFormSubmitForEditing(user.name, user.about);
     })

 const allCards =getCards()
     .then((cards)=>{
        cards.forEach((card)=>{
            addCard(card.name, card.link);
            amountOfLikesElement.forEach(element=>{
                element.innerText= card.likes.length;
                console.log(element.innerText)
         // console.log(card.likes.length + 'likes')
            })
        })
     })


Promise.all([userInfo, allCards])
    .then(results=>{
    })

const updateProfile = saveEditingInProfile(nameOfUserInPage.innerText, descriptionOfUserInPage.innerHTML)
    .then(res=>{
    })






