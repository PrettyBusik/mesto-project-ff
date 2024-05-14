import {initialCards} from "./cards";
import './../pages/index.css';
import {showPopupEditing,showPopupAdding,showPopupCard, closeCurrentPopup} from "./popup";
import {fillEditingForm,subscribeToEditingFormSubmitting} from "./forms";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const listOfCards = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, removingCard, like) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = card.link;
    newCard.querySelector('.card__title').textContent = card.name;


    const deleteButton = newCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removingCard);
    return newCard;
}

// @todo: Функция удаления карточки
function removeCard(event) {
    const eventTarget = event.target;
    const cardForRemoving = eventTarget.closest('.card');
    cardForRemoving.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    const newCard = createCard(card, removeCard);
    listOfCards.append(newCard)
})




const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
    fillEditingForm(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText)
    showPopupEditing();
});

const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click',  showPopupAdding);

const cardImg = document.querySelector('.card__image');
const popupImg = document.querySelector('.popup_type_image');
// cardImg.addEventListener('click', () => showPopup(popupImg));




const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');


function handleFormSubmitForEditing(newName, newJob) {

    nameOfUserInPage.textContent = newName;
    descriptionOfUserInPage.textContent = newJob;
    closeCurrentPopup();
}

// Прикрепляем обработчик к форме:
subscribeToEditingFormSubmitting( handleFormSubmitForEditing);


const newCardForm = document.forms['new-place'];
const cityInput = newCardForm.elements['place-name'];
const linkInput = newCardForm.elements.link;

function handlerFormSubmitForAddingCard(event) {
    event.preventDefault();
    const valueForCity = cityInput.value;
    const valueForLink = linkInput.value;
    const newCard = {
        name: valueForCity,
        link: valueForLink
    }
    const cardForAdding = createCard(newCard, removeCard);
    listOfCards.prepend(cardForAdding);
    closeCurrentPopup();
    newCardForm.reset();
}

newCardForm.addEventListener('submit', handlerFormSubmitForAddingCard);


function like(event) {
    const likeButton = event.target;
    if (event.target.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active')
    } else {
        likeButton.classList.add('card__like-button_is-active')
    }
}

listOfCards.addEventListener('click', function (event) {
    if (event.target.classList.contains('card__like-button')) {
        like(event)
    }
})

