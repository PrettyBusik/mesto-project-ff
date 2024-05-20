/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addCard: () => (/* binding */ addCard)
/* harmony export */ });
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup */ "./src/scripts/popup.js");
/* harmony import */ var _initialCards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./initialCards */ "./src/scripts/initialCards.js");


var cardTemplate = document.querySelector('#card-template').content;
var listOfCards = document.querySelector('.places__list');
var popupCard = document.querySelector('.popup_type_image');

/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 */
function addCard(nameOfPlace, link) {
  var newCard = creatCardNode(nameOfPlace, link, handleDeletingButton, handleLike, handleCardClick);
  listOfCards.prepend(newCard);
  console.log(1);
}
function addInitialCards() {
  _initialCards__WEBPACK_IMPORTED_MODULE_1__.initialCards.forEach(function (card) {
    var newCard = creatCardNode(card.name, card.link, handleDeletingButton, handleLike, handleCardClick);
    listOfCards.append(newCard);
  });
}

/**
 *
 * @param {string} nameOfPlace
 * @param {string} link
 * @return {Element}
 */
function creatCardNode(nameOfPlace, link, removeCard, likeCard, clickCard) {
  var newCard = cardTemplate.querySelector('.card').cloneNode(true);
  var cardImg = newCard.querySelector('.card__image');
  cardImg.src = link;
  cardImg.alt = nameOfPlace;
  newCard.querySelector('.card__title').textContent = nameOfPlace;
  var deleteCardButton = newCard.querySelector('.card__delete-button');
  deleteCardButton.addEventListener('click', removeCard);
  var likeCardButton = newCard.querySelector('.card__like-button');
  likeCardButton.addEventListener('click', likeCard);
  newCard.addEventListener('click', clickCard);
  return newCard;
}
function handleDeletingButton(event) {
  event.stopPropagation();
  var cardForRemoving = event.target.closest('.card');
  cardForRemoving.remove();
}
function handleLike(event) {
  event.stopPropagation();
  var likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}
function handleCardClick(event) {
  var cardNode;
  if (event.target.classList.contains('card')) {
    cardNode = event.target;
  } else {
    cardNode = event.target.closest('.card');
  }
  var imgSrc = cardNode.querySelector('.card__image').src;
  var titleOfCard = cardNode.querySelector('.card__title').innerText;
  (0,_popup__WEBPACK_IMPORTED_MODULE_0__.showPopupCard)(imgSrc, titleOfCard, popupCard);
}
addInitialCards();

/***/ }),

/***/ "./src/scripts/forms.js":
/*!******************************!*\
  !*** ./src/scripts/forms.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fillEditingForm: () => (/* binding */ fillEditingForm),
/* harmony export */   subscribeToAddingFormSubmitting: () => (/* binding */ subscribeToAddingFormSubmitting),
/* harmony export */   subscribeToEditingFormSubmitting: () => (/* binding */ subscribeToEditingFormSubmitting)
/* harmony export */ });
var editingForm = document.forms['edit-profile'];
var addingForm = document.forms['new-place'];

/**
 *
 * @param {string} userName
 * @param {string} userJob
 */
function fillEditingForm(userName, userJob) {
  var nameInput = editingForm.elements.name;
  var jobInput = editingForm.elements.description;
  nameInput.value = userName;
  jobInput.value = userJob;
}

/**
 *
 * @param {function(string, string)} callback
 */
function subscribeToEditingFormSubmitting(callback) {
  editingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var newName = editingForm.elements.name.value;
    var newJob = editingForm.elements.description.value;
    callback(newName, newJob);
  });
}

/**
 *
 * @param {function(string, string)} callback
 */
function subscribeToAddingFormSubmitting(callback) {
  addingForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var newCityValue = addingForm.elements['place-name'].value;
    var newLinkValue = addingForm.elements.link.value;
    callback(newCityValue, newLinkValue);
    addingForm.reset();
  });
}

/***/ }),

/***/ "./src/scripts/initialCards.js":
/*!*************************************!*\
  !*** ./src/scripts/initialCards.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initialCards: () => (/* binding */ initialCards)
/* harmony export */ });
var initialCards = [{
  name: "Архыз",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
}, {
  name: "Челябинская область",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
}, {
  name: "Иваново",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
}, {
  name: "Камчатка",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
}, {
  name: "Холмогорский район",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
}, {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
}];
var x = {
  name: "Байкал",
  link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
};

/***/ }),

/***/ "./src/scripts/popup.js":
/*!******************************!*\
  !*** ./src/scripts/popup.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeCurrentPopup: () => (/* binding */ closeCurrentPopup),
/* harmony export */   openPopup: () => (/* binding */ openPopup),
/* harmony export */   showPopupCard: () => (/* binding */ showPopupCard)
/* harmony export */ });
var imageNode = document.querySelector('.popup__image');
var titleNode = document.querySelector('.popup__caption');
/**
 *
 * @param {string} imageSrc
 * @param {string} title
 * @param {Element} popupCard
 */
function showPopupCard(imageSrc, title, popupCard) {
  imageNode.src = imageSrc;
  imageNode.alt = title;
  titleNode.innerText = title;
  openPopup(popupCard);
}

/**
 *
 * @param {Element} popup
 */
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', onEscapePress);
}
function closeCurrentPopup() {
  var currentPopup = document.querySelector('.popup_is-opened');
  currentPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', onEscapePress);
}
function onEscapePress(event) {
  if (event.key === 'Escape') {
    closeCurrentPopup();
  }
}

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../pages/index.css */ "./src/pages/index.css");
/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup */ "./src/scripts/popup.js");
/* harmony import */ var _forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forms */ "./src/scripts/forms.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards */ "./src/scripts/cards.js");




var popupEdit = document.querySelector('.popup_type_edit');
var popupAdding = document.querySelector('.popup_type_new-card');
var popups = document.querySelectorAll('.popup');
var nameOfUserInPage = document.querySelector('.profile__title');
var descriptionOfUserInPage = document.querySelector('.profile__description');
popups.forEach(function (popup) {
  popup.addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      (0,_popup__WEBPACK_IMPORTED_MODULE_1__.closeCurrentPopup)();
    }
  });
});

//Форма редактирования
var editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', function () {
  (0,_popup__WEBPACK_IMPORTED_MODULE_1__.openPopup)(popupEdit);
  (0,_forms__WEBPACK_IMPORTED_MODULE_2__.fillEditingForm)(nameOfUserInPage.innerText, descriptionOfUserInPage.innerText);
});
function handleFormSubmitForEditing(newName, newJob) {
  nameOfUserInPage.textContent = newName;
  descriptionOfUserInPage.textContent = newJob;
  (0,_popup__WEBPACK_IMPORTED_MODULE_1__.closeCurrentPopup)();
}
(0,_forms__WEBPACK_IMPORTED_MODULE_2__.subscribeToEditingFormSubmitting)(handleFormSubmitForEditing);

// Форма создания
var addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', function () {
  (0,_popup__WEBPACK_IMPORTED_MODULE_1__.openPopup)(popupAdding);
});
function handleFormSubmitForAddingCard(nameOfPlace, imgLink) {
  (0,_cards__WEBPACK_IMPORTED_MODULE_3__.addCard)(nameOfPlace, imgLink);
  (0,_popup__WEBPACK_IMPORTED_MODULE_1__.closeCurrentPopup)();
}
(0,_forms__WEBPACK_IMPORTED_MODULE_2__.subscribeToAddingFormSubmitting)(handleFormSubmitForAddingCard);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map