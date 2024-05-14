const popupEdit= document.querySelector('.popup_type_edit');
const popupAdding= document.querySelector('.popup_type_new-card');
const popupCard= document.querySelector('.popup_type_image');

/**
 *
 * @param {string} imageSrc
 * @param {string} title
 */
export function showPopupCard(imageSrc, title){
    const imageNode=popupCard.querySelector('.popup__image');
    const titleNode= popupCard.querySelector('.popup__caption');

    imageNode.src= imageSrc;
    titleNode.innerText= title;
    openPopup(popupCard);
}

export function showPopupAdding(){
    openPopup(popupAdding);
}


export function showPopupEditing(){
    openPopup(popupEdit);
}

/**
 *
 * @param {Element} popup
 */
function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', onKeyPress);
}

export  function closeCurrentPopup() {
    const currentPopup = document.querySelector('.popup_is-opened');
    currentPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', onKeyPress);
}

const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
    popup.addEventListener('mousedown', function (event) {
        if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
            closeCurrentPopup();
        }
    })
})

function onKeyPress(event) {
    if (event.key === 'Escape') {
        closeCurrentPopup();
    }
}
