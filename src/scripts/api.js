const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
        authorization: 'dfe75a01-fd3b-4ce7-b6ac-2e9511af568c',
        'Content-Type': 'application/json'
    }
}

export const getInfoAboutUser= ()=>{
   return  fetch(`${config.baseUrl}/users/me`, {
       method:'GET',
       headers: config.headers
   })
        .then(res=>{
           return  res.json();
        })
        .then(user=>{
            // console.log(user)
        })
}

export  const getCards= ()=>{
    return fetch(`${config.baseUrl}/cards`, {
        method:'GET',
        headers: config.headers
    })
        .then(res=>{
            return res.json();
        })
        .then(cards=>{
            console.log(cards)
        })
}