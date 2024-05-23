const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
        authorization: 'dfe75a01-fd3b-4ce7-b6ac-2e9511af568c',
        'Content-Type': 'application/json'
    }
}

const handelResult= (res) => {
    return res.json();
}

export const getInfoAboutUser= ()=>{
   return  fetch(`${config.baseUrl}/users/me`, {
       method:'GET',
       headers: config.headers
   })
        .then(handelResult)
}

export  const getAllCards= ()=>{
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handelResult)
}

export const saveEditingInProfile = (nameOfUser, descriptionOfUser) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameOfUser,
            about: descriptionOfUser
        })
    })
}

export const postNewCard=(nameOfPlace, linkOfPlace)=>{
   return  fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body:JSON.stringify({
            name:nameOfPlace,
            link:linkOfPlace
        })
    })
}

export const deleteCardFromServer= (idCard)=>{
    return fetch(`${config.baseUrl}/cards/${idCard}`,{
        method:"DELETE",
        headers:config.headers
    })
}