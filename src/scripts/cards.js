import {openPopup} from "./popup";
import {deleteCardFromServer, setLike, deleteLike} from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const popupCard = document.querySelector('.popup_type_image');

const imageNode = document.querySelector('.popup__image');
const titleNode = document.querySelector('.popup__caption');

/**
 *
 * @param {object} card
 * @param {boolean} isMyCard
 * @param {boolean} isLiked
 * @return {Element}
 */
export function creatCardNode(card, isMyCard, isLiked) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const amountOfLikesElement = newCard.querySelector('.card__Likes-amount');
    cardImg.src = card.link;
    cardImg.alt = card.name;
    newCard.querySelector('.card__title').textContent = card.name;
    amountOfLikesElement.innerText = card.likes.length === 0 ? '' : card.likes.length;

    const deleteCardButton = newCard.querySelector('.card__delete-button');
    if (!isMyCard) {
        deleteCardButton.style.display = "none";
    } else {
        deleteCardButton.addEventListener('click', (event) => handleDeletingButton(event, card._id));
    }

    const likeCardButton = newCard.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', (ev) => handleLike(ev, card._id));
    showLike(newCard, isLiked);

    newCard.addEventListener('click', handleCardClick)

    return newCard;
}

function handleDeletingButton(event, idCard) {
    event.stopPropagation();
    deleteCardFromServer(idCard)
        .then(() => {
            event.target.closest('.card').remove();
        })
        .catch(err => {
            console.log(err)
        })
    ;
}

function handleLike(event, idCard) {
    event.stopPropagation();
    const likeButton = event.target;
    const cardLikesAmountElement = event.target.closest('.card__likes').querySelector('.card__Likes-amount')
    if (!likeButton.classList.contains('card__like-button_is-active')) {
        setLike(idCard)
            .then(card => {
                likeButton.classList.add('card__like-button_is-active')
                cardLikesAmountElement.innerText = card.likes.length;

            })
            .catch(err => {
                console.log(err)
            })
    } else {
        deleteLike(idCard)
            .then(card => {
                likeButton.classList.remove('card__like-button_is-active');
                cardLikesAmountElement.innerText = card.likes.length;

            })
            .catch(err => {
                console.log(err)
            })
    }
}

function showLike(card, isLiked) {
    const likeCardButton = card.querySelector('.card__like-button');
    if (isLiked) {
        likeCardButton.classList.add('card__like-button_is-active');
    } else {
        likeCardButton.classList.remove('card__like-button_is-active');
    }
}

function handleCardClick(event) {
    const cardNode = event.target.classList.contains('card') ? event.target : event.target.closest('.card');

    const imgSrc = cardNode.querySelector('.card__image').src;
    const titleOfCard = cardNode.querySelector('.card__title').innerText;

    imageNode.src = imgSrc;
    imageNode.alt = titleOfCard;
    titleNode.innerText = titleOfCard;

    openPopup(popupCard);
}

