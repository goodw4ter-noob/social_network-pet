import { AJAX, area, bigArea, chat_form, postTextarea } from '../helper.js'

export const state = {
    authedUser: '',
    users: [],
    posts: [],
    messages: [],
};

export const createNewPost = async function() {
    if (postTextarea.value === '') return;

    const newId = (state.posts[state.posts.length - 1].id) + 1;

    const date = new Date().toLocaleTimeString('ru-RU').slice(0, 5);

    const post = {
        "id": newId,
        "text": postTextarea.value,
        "time": date,
        "author": {
            "id": state.authedUser.id,
            "nickname": state.authedUser.nickname,
        }
    };
    
    state.posts.push(post);
    await AJAX('http://localhost:3000/posts', post);

    return post;
}

export const getPosts = async function() {
    const data = await (await fetch('http://localhost:3000/posts')).json();
    state.posts.push(...data);
}

const getUsers = async function() {
    const data = await (await fetch('http://localhost:3000/users')).json();
    return data;
};

export const createUsers = async function() {
    const users = await getUsers();

    users.forEach(el => {
        el.nickname = el.name.split(' ').map(el => el.slice(0, 1)).join('').toLowerCase();
    })

    state.users.push(...users);
};

export const checkAuth = function () {
    const inputUsername = document.querySelector('.login__input--nickname');
    const inputPassword = document.querySelector('.login__input--password');

    if (inputUsername.value === '' || inputPassword.value === '') return;

    state.users.forEach(el => {
        if (el.nickname === inputUsername.value && el.password === Number(inputPassword.value)) {
            el.authorized = true;
            state.authedUser = el;
            console.log(state.authedUser);
        } else {
            el.authorized = false;
        }
    });

    inputUsername.value = '';
    inputPassword.value = '';
};

export const getValue = function () {
    if (chat_form.classList.contains('hidden')) {
        const msg = bigArea.value;
        return msg
    }
    const msg = area.value;
    return msg;
}

export const saveMsg = function (message) {
    if (!message) return;
    const date = new Date().toLocaleTimeString('ru-RU').slice(0, 5);
    const msgObj = {
        text: message,
        date,
    }
    state.messages.push(msgObj);
    area.value = '';
    bigArea.value = '';
};
