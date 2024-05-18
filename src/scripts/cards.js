import {showPopupCard} from "./popup";

const cardTemplate = document.querySelector('#card-template').content;
const listOfCards = document.querySelector('.places__list');
const popupCard= document.querySelector('.popup_type_image');

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


/**
 *
 * @param {string} city
 * @param {string} link
 */
export function addCard(city, link) {
    const newCard = creatCardNode(city, link)
    listOfCards.prepend(newCard);
}

function addInitialCards() {
    initialCards.forEach(function (card) {
        const newCard = creatCardNode(card.name, card.link)
        listOfCards.append(newCard);
    })
}

/**
 *
 * @param {string} city
 * @param {string} link
 * @return {Element}
 */
function creatCardNode(city, link) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    newCard.querySelector('.card__image').src = link;
    newCard.querySelector('.card__title').textContent = city;
    return newCard;
}

function handlerDeletingButton(event) {
    const cardForRemoving = event.target.closest('.card');
    cardForRemoving.remove();
}

function handlerLike(event) {
    const likeButton = event.target;

    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active')
    } else {
        likeButton.classList.add('card__like-button_is-active')
    }
}

function handlerCardClick(event) {
    let cardNode;

    if (event.target.classList.contains('card')) {
        cardNode = event.target;
    } else {
        cardNode = event.target.closest('.card');
    }

    const imgSrc= cardNode.querySelector('.card__image').src;
    const titleOfCard= cardNode.querySelector('.card__title').innerText;

    showPopupCard(imgSrc, titleOfCard, popupCard);
}

addInitialCards();
listOfCards.addEventListener('click', function (event) {
    if (event.target.classList.contains('card__delete-button')) {
        handlerDeletingButton(event)
    } else if (event.target.classList.contains('card__like-button')) {
        handlerLike(event);
    } else {
        handlerCardClick(event)
    }
})
