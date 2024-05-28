const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    urlMe:'https://nomoreparties.co/v1/wff-cohort-14/users/me',
    urlCards: 'https://nomoreparties.co/v1/wff-cohort-14/cards',
    urlCardLikes: 'https://nomoreparties.co/v1/wff-cohort-14/cards/likes',
    headers: {
        authorization: 'dfe75a01-fd3b-4ce7-b6ac-2e9511af568c',
        'Content-Type': 'application/json'
    }
}

const handelResult = (res) => {
    if (res.ok){
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getInfoAboutUser = () => {
    return fetch(`${config.urlMe}`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handelResult)
}

export const getAllCards = () => {
    return fetch(`${config.urlCards}`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handelResult)
}

export const saveEditingInProfile = (nameOfUser, descriptionOfUser) => {
    return fetch(`${config.urlMe}`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameOfUser,
            about: descriptionOfUser
        })
    })
        .then(handelResult)
}

export const postNewCard = (card) => {
    return fetch(`${config.urlCards}`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(card)
    })
        .then(handelResult)
}

export const deleteCardFromServer = (idCard) => {
    return fetch(`${config.urlCards}/${idCard}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(handelResult)
}

export const setLike = (idCard) => {
    return fetch(`${config.urlCardLikes}/${idCard}`, {
        method: "PUT",
        headers: config.headers
    })
        .then(handelResult)
}

export const deleteLike = (idCard) => {
    return fetch(`${config.urlCardLikes}/${idCard}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(handelResult)
}

export const changeAvatar = (avatarLink) => {
    return fetch(`${config.urlMe}/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({avatar: avatarLink})
    })
        .then(handelResult);

}