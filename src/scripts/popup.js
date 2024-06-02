/**
 * @param {Element} popup
 */
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');

}

/**
 * @param {Element} popup
 */
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
}

function onEscapePress(event) {
    if (event.key === 'Escape') {
        const currentPopup = document.querySelector('.popup_is-opened');
        if (currentPopup !== null) {
            closePopup(currentPopup)
        }
    }
}

document.addEventListener('keydown', onEscapePress);