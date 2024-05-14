import {initialCards} from "./cards";
import './../pages/index.css';

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

function showPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onKeyPress);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', onKeyPress)
}


function onKeyPress(event) {
    if (event.key === 'Escape') {
        closeCurrentPopup();
    }
}

function closeCurrentPopup() {
    const currentPopup = document.querySelector('.popup_is-opened');
    closePopup(currentPopup);
}

const editButton = document.querySelector('.profile__edit-button');
const popupForEditing = document.querySelector('.popup_type_edit');
editButton.addEventListener('click', function () {
    nameInput.value = nameOfUserInPage.innerHTML;
    jobInput.value = descriptionOfUserInPage.innerHTML
    showPopup(popupForEditing);
});

const addButton = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
addButton.addEventListener('click', () => showPopup(popupNewCard));

const cardImg = document.querySelector('.card__image');
const popupImg = document.querySelector('.popup_type_image');
cardImg.addEventListener('click', () => showPopup(popupImg));


const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
    popup.addEventListener('mousedown', function (event) {
        if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
            closeCurrentPopup();
        }
    })
})


const nameOfUserInPage = document.querySelector('.profile__title');
const descriptionOfUserInPage = document.querySelector('.profile__description');


// Находим форму в DOM
const editingForm = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = editingForm.elements.name
const jobInput = editingForm.elements.description;


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmitForEditing(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    const valueForName = nameInput.value;
    const valueForJob = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    nameOfUserInPage.textContent = valueForName;
    descriptionOfUserInPage.textContent = valueForJob;
    closeCurrentPopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editingForm.addEventListener('submit', handleFormSubmitForEditing);


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

