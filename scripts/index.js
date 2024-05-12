import {initialCards} from "./cards";
import '/pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const listOfCards = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, removingCard) {
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
    listOfCards.append(newCard);
})