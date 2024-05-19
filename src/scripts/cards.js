import {showPopupCard} from "./popup";
import {initialCards} from "./initialCards";

const cardTemplate = document.querySelector('#card-template').content;
const listOfCards = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_image');


/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 */
export function addCard(nameOfPlace, link) {
    const newCard = creatCardNode(nameOfPlace, link, handleDeletingButton, handleLike, handleCardClick);
    listOfCards.prepend(newCard);
}

function addInitialCards() {
    initialCards.forEach(function (card) {
        const newCard = creatCardNode(card.name, card.link, handleDeletingButton, handleLike, handleCardClick)
        listOfCards.append(newCard);
    })
}

/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 * @return {Element}
 */
function creatCardNode(nameOfPlace, link, removeCard, likeCard, clickCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    cardImg.src = link;
    cardImg.alt = nameOfPlace;
    newCard.querySelector('.card__title').textContent = nameOfPlace;

    const deleteCardButton= newCard.querySelector('.card__delete-button');
    deleteCardButton.addEventListener('click', removeCard);

    const likeCardButton= newCard.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', likeCard);


    newCard.addEventListener('click',clickCard )

    return newCard;
}

function handleDeletingButton(event) {
    event.stopPropagation();
    const cardForRemoving = event.target.closest('.card');
    cardForRemoving.remove();
}

function handleLike(event) {
    event.stopPropagation();
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_is-active');
}

function handleCardClick(event) {
    let cardNode;

    if (event.target.classList.contains('card')) {
        cardNode = event.target;
    } else {
        cardNode = event.target.closest('.card');
    }

    const imgSrc = cardNode.querySelector('.card__image').src;
    const titleOfCard = cardNode.querySelector('.card__title').innerText;

    showPopupCard(imgSrc, titleOfCard, popupCard);
}

addInitialCards();


