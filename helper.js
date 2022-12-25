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