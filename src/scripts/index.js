import './../pages/index.css';
import {closeCurrentPopup, openPopup} from "./popup";
import {
    fillEditingForm,
    subscribeToAddingFormSubmitting,
    subscribeToEditingFormSubmitting,
    subscribeToNewAvatarFormSubmitting
} from "./forms";
import {addCard} from "./cards";
import {clearValidation, enableValidation} from "./validation";
import {getAllCards, getInfoAboutUser, postNewCard, saveEditingInProfile, changeAvatar} from "./api";

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdding = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popups = document.querySelectorAll('.popup');


const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');


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


const avatarNode = document.querySelector('.profile__image');
avatarNode.addEventListener('click', () => {
    openPopup(popupAvatar);
})

function handleSubmitFormForNewAvatar(newAvatarLink) {
    changeAvatar(newAvatarLink)
        .then(res => {
            closeCurrentPopup();
            avatarNode.style.backgroundImage = `url(${res.avatar})`;
        })
}

subscribeToNewAvatarFormSubmitting(handleSubmitFormForNewAvatar);

//Форма редактирования
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    openPopup(popupEdit);
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText);
    clearValidation(popupEdit.querySelector('.popup__form'), config);

});

function handleFormSubmitForEditing(newName, newJob) {
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText)
    saveEditingInProfile(newName, newJob)
        .then(userInfo =>{
            nameOfUserInPage.textContent = userInfo.name;
           descriptionOfUserInPage.textContent = userInfo.about;
        })
    closeCurrentPopup();
}

subscribeToEditingFormSubmitting(handleFormSubmitForEditing);


// Форма создания
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    openPopup(popupAdding);
});

function handleFormSubmitForAddingCard(nameOfPlace, imgLink) {
    const newCard = {
        name: nameOfPlace,
        link: imgLink,
        likes: []
    }
    addCard(newCard, true, false);
    postNewCard(newCard);
    closeCurrentPopup();
    clearValidation(popupAdding.querySelector('.popup__form'), config);
}

subscribeToAddingFormSubmitting(handleFormSubmitForAddingCard);


enableValidation(config);

let myId;
Promise.all([getInfoAboutUser(), getAllCards()])
    .then(([user, allCards]) => {
        avatarNode.style.backgroundImage = `url(${user.avatar})`
        nameOfUserInPage.innerText = user.name;
        descriptionOfUserInPage.innerText = user.about;

        myId = user._id;

        allCards.forEach((card) => {
            let isMyCard = false;
            let isLiked = false;
            if (myId === card.owner._id) {
                isMyCard = true;
            }

            card.likes.forEach(like => {
                if (myId === like._id) {
                    isLiked = true;
                }
            })

            addCard(card, isMyCard, isLiked);
        })

    })

