export const area = document.querySelector('.textarea');
export const chat_form = document.querySelector('.chat-form');
export const bigArea = document.querySelector('.textarea-big');
export const postTextarea = document.querySelector('.post-textarea');

export const AJAX = async function (url, uploadData) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
    })
}

export const DeleteAJAX = async function(url, dataToDelete) {
    await fetch(url, {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToDelete),
      })
}

export const PutAJAX = async function(url, dataToPut) {
    await fetch(url, {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataToPut),
      })
}

// {
//     "id": 1,
//     "name": "John Smith",
//     "password": 1111,
//     "messages": [],
//     "img": " /img/bird.png",
//     "city": "Montreal",
//     "country": "Canada",
//     "flag": "/img/canada.svg",
//     "links": [
//       "https://en.wikipedia.org/wiki/Canada",
//       "https://www.youtube.com/"
//     ]
//   }