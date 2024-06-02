import './../pages/index.css';
import {closePopup, openPopup} from "./popup";
import {
    fillEditingForm,
    subscribeToAddingFormSubmitting,
    subscribeToEditingFormSubmitting,
    subscribeToNewAvatarFormSubmitting,
    clearInputsInCreateCardForm,
    clearInputsInNewAvatarForm
} from "./forms";
import {creatCardNode} from "./cards";
import {clearValidation, enableValidation} from "./validation";
import {getAllCards, getInfoAboutUser, postNewCard, saveEditingInProfile, changeAvatar} from "./api";

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdding = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popups = document.querySelectorAll('.popup');


const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');


const originTextInSaveButtons = 'Сохранить';

const listOfCards = document.querySelector('.places__list');


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
            closePopup(popup);
        }
    })
})


const avatarNode = document.querySelector('.profile__image');
avatarNode.addEventListener('click', () => {
    openPopup(popupAvatar);
})

function handleSubmitFormForNewAvatar(newAvatarLink) {
    const saveButtonInForm = popupAvatar.querySelector(config.submitButtonSelector);
    changeAvatar(newAvatarLink)
        .then(res => {
            clearInputsInNewAvatarForm();
            closePopup(popupAvatar);
            avatarNode.style.backgroundImage = `url(${res.avatar})`;
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            saveButtonInForm.textContent = originTextInSaveButtons;
        })
}

subscribeToNewAvatarFormSubmitting(handleSubmitFormForNewAvatar);

//Форма редактирования
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {

    openPopup(popupEdit);
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText);
});

function handleFormSubmitForEditing(newName, newJob) {
    const saveButtonInForm = popupEdit.querySelector(config.submitButtonSelector);
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText);

    saveEditingInProfile(newName, newJob)
        .then(userInfo => {
            nameOfUserInPage.textContent = userInfo.name;
            descriptionOfUserInPage.textContent = userInfo.about;
            closePopup(popupEdit);
            clearValidation(popupEdit.querySelector('.popup__form'), config);
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            saveButtonInForm.textContent = originTextInSaveButtons;
        })
}

subscribeToEditingFormSubmitting(handleFormSubmitForEditing);


// Форма создания
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
    openPopup(popupAdding);
});

function handleFormSubmitForAddingCard(nameOfPlace, imgLink) {
    const saveButtonInForm = popupAdding.querySelector(config.submitButtonSelector);
    const newCard = {
        name: nameOfPlace,
        link: imgLink,
        likes: []
    }

    postNewCard(newCard)
        .then(card => {
            addCard(card, true, false);
            clearValidation(popupAdding.querySelector('.popup__form'), config);
            closePopup(popupAdding);
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            saveButtonInForm.textContent = originTextInSaveButtons;
        });

    clearInputsInCreateCardForm();
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

        const cardsSorted = allCards.reverse();
        cardsSorted.forEach((card) => {
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
    .catch(err => {
        console.log(err)
    })



/**
 *
 * @param {object} card
 * @param {boolean} isMyCard
 * @param {boolean} isLiked
 */

 function addCard(card, isMyCard, isLiked) {
    const newCard = creatCardNode(card, isMyCard, isLiked);
    listOfCards.prepend(newCard);
}