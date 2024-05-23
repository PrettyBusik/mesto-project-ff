import {showPopupCard} from "./popup";
import {deleteCardFromServer} from "./api";

const cardTemplate = document.querySelector('#card-template').content;
const listOfCards = document.querySelector('.places__list');
const popupCard = document.querySelector('.popup_type_image');


/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 */
export function addCard(nameOfPlace, link, amountOfLikes, isMyCard, idCard) {
    const newCard = creatCardNode(nameOfPlace, link, handleDeletingButton, handleLike, handleCardClick, amountOfLikes, isMyCard, idCard);
    console.log("addcard id ="+ idCard)
    listOfCards.prepend(newCard);
}

/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 * @return {Element}
 */
function creatCardNode(nameOfPlace, link, removeCard, likeCard, clickCard, amountOfLikes, isMyCard, idCard) {
    const newCard = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = newCard.querySelector('.card__image');
    const amountOfLikesElement = newCard.querySelector('.card__Likes-amount');
    cardImg.src = link;
    cardImg.alt = nameOfPlace;
    newCard.querySelector('.card__title').textContent = nameOfPlace;
   amountOfLikesElement.innerText= amountOfLikes===0? '': amountOfLikes;
    idCard!==""?console.log("createCard "+ idCard): console.log('');
    const deleteCardButton= newCard.querySelector('.card__delete-button');

    if (!isMyCard){
        deleteCardButton.style.display="none";
    }else {
        deleteCardButton.addEventListener('click',(event)=> removeCard(event,idCard));
    }

    const likeCardButton= newCard.querySelector('.card__like-button');
    likeCardButton.addEventListener('click', likeCard);


    newCard.addEventListener('click',clickCard )

    return newCard;
}

function handleDeletingButton(event, idCard) {
   console.log("принимает"+ idCard)
    deleteCardFromServer(idCard).then(result=>{
        if (result.ok){
            event.target.closest('.card').remove();
        }
    console.log(result.status)
        console.log(1)
});
    // event.stopPropagation();
    // const cardForRemoving = event.target.closest('.card');

    // cardForRemoving.remove();
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


