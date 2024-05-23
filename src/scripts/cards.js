import {showPopupCard} from "./popup";
import {deleteCardFromServer, setLike, deleteLike} from "./api";

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
    likeCardButton.addEventListener('click', (ev)=>likeCard(ev, card._id));

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

function handleLike(event, idCard) {
    event.stopPropagation();
    const likeButton = event.target;
    const cardLikesAmountElement = event.target.closest('.card__likes').querySelector('.card__Likes-amount')
    if (!likeButton.classList.contains('card__like-button_is-active')){
        likeButton.classList.add('card__like-button_is-active')
        setLike(idCard)
            .then(card=>{
                cardLikesAmountElement.innerText= card.likes.length;
            })
    }else {
        likeButton.classList.remove('card__like-button_is-active')
        deleteLike(idCard)
            .then(card =>{
                cardLikesAmountElement.innerText= card.likes.length;
            })
    }
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


