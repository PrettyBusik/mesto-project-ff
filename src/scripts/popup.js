/**
 *
 * @param {Element} popupCard
 */
export function showPopupCard(popupCard) {
    openPopup(popupCard);
}

/**
 *
 * @param {Element} popup
 */
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onEscapePress);
}

export function closeCurrentPopup() {
    const currentPopup = document.querySelector('.popup_is-opened');
    if (currentPopup) {
        currentPopup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', onEscapePress);
    }

}

function onEscapePress(event) {
    if (event.key === 'Escape') {
        closeCurrentPopup();
    }
}
