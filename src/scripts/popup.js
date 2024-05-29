/**
 *
 * @param {Element} popup
 */
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onEscapePress);
}


export function closePopup(popup) {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', onEscapePress);
}

function onEscapePress(event) {
    if (event.key === 'Escape') {
        // closeCurrentPopup();
    }
}

