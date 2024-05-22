import {showPopupCard} from "./popup";

const cardTemplate = document.querySelector('#card-template').content;
const listOfCards = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_image');


/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 */
export function addCard(nameOfPlace, link, amountOfLikes, isMyCard) {
    const newCard = creatCardNode(nameOfPlace, link, handleDeletingButton, handleLike, handleCardClick, amountOfLikes, isMyCard);

    listOfCards.prepend(newCard);
}

/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 * @return {Element}
 */
function creatCardNode(nameOfPlace, link, removeCard, likeCard, clickCard, amountOfLikes, isMyCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const amountOfLikesElement = newCard.querySelector('.card__Likes-amount');
    cardImg.src = link;
    cardImg.alt = nameOfPlace;
    newCard.querySelector('.card__title').textContent = nameOfPlace;
   amountOfLikesElement.innerText= amountOfLikes===0? '': amountOfLikes;

    const deleteCardButton= newCard.querySelector('.card__delete-button');
    if (!isMyCard){
        deleteCardButton.style.display="none";
    }
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


