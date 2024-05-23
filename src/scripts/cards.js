import {showPopupCard} from "./popup";
import {deleteCardFromServer} from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const listOfCards = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_image');


/**
 *
 * @param {object} card
 * @param {boolean} isMyCard
 */
export function addCard(card, isMyCard) {
    const newCard = creatCardNode(card, handleDeletingButton, handleLike, handleCardClick, isMyCard);
    listOfCards.prepend(newCard);
}

/**
 *
 * @param {object} card
 * @param {function} removeCard
 * @param {function} likeCard
 * @param {function} clickCard
 * @param {boolean} isMyCard
 * @return {Element}
 */
function creatCardNode(card, removeCard, likeCard, clickCard, isMyCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const amountOfLikesElement = newCard.querySelector('.card__Likes-amount');
    cardImg.src = card.link;
    cardImg.alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
  amountOfLikesElement.innerText= card.likes.length===0? '':  card.likes.length;

    const deleteCardButton= newCard.querySelector('.card__delete-button');
    if (!isMyCard){
        deleteCardButton.style.display="none";
    }else {
        deleteCardButton.addEventListener('click',(event)=> removeCard(event,card._id));
    }

    const likeCardButton= newCard.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', likeCard);

    newCard.addEventListener('click',clickCard )

    return newCard;
}

function handleDeletingButton(event, idCard) {
    deleteCardFromServer(idCard).then(result=>{
        if (result.ok){
            event.target.closest('.card').remove();
        }
});
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


