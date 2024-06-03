

const cardTemplate = document.querySelector('#card-template').content;

/**
 *
 * @param {object} card
 * @param {boolean} isMyCard
 * @param {boolean} isLiked
 * @param {function} handleCardClick
 * @param {function} handleLike
 * @return {Element}
 */
export function creatCardNode(card, isMyCard, isLiked, handleCardClick, handleLike, handleDeletingButton) {
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

function showLike(card, isLiked) {
    const likeCardButton = card.querySelector('.card__like-button');
    if (isLiked) {
        likeCardButton.classList.add('card__like-button_is-active');
    } else {
        likeCardButton.classList.remove('card__like-button_is-active');
    }
}


