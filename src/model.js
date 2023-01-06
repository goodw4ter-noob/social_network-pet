import { AJAX, postTextarea, PutAJAX } from '../helper.js'

export const state = {
    authedUser: '',
    users: [],
    posts: [],
    messages: [],
};

export const createMsgObject = async function (data) {
    const newId = Number(state.messages[state.messages.length - 1].id) + 1;
    const date = new Date().toLocaleTimeString('ru-RU').slice(0, 5);

    const msgObj = {
        "id": newId,
        "to": data.userToChatWith.id,
        "from": state.authedUser.id,
        "text": data.text,
        "time": date,
    };

    state.messages.push(msgObj);
    await AJAX('http://localhost:3000/messages', msgObj);
    return msgObj;
}

export const getUserById = function (e) {
    const id = e.currentTarget.hash.slice(1);
    return id;
}

export const getUserToChatWith = function (id) {
    const userToChatWith = state.users.find(user => user.id == id);
    return userToChatWith;
}

export const loadMessages = function (user) {
    const msgsToPrint = state.messages.filter(msg => {
        if ((msg.to == state.authedUser.id && msg.from == user.id) ||
            (msg.to == user.id && msg.from == state.authedUser.id)) {
            return msg;
        }
    });

    console.log(msgsToPrint, 'msgToPrint');
    return msgsToPrint;
}

export const getMessages = async function () {
    const messages = await (await fetch('http://localhost:3000/messages')).json();
    state.messages.push(...messages);
    console.log(state.messages);
}

export const updatePosts = async function () {
    let postsToUpadte = [];

    state.posts.forEach(post => {
        if (post.author.id === state.authedUser.id) {
            post.author.nickname = state.authedUser.nickname;
            postsToUpadte.push(post);
        }
    })

    postsToUpadte.forEach(post => {
        PutAJAX(`http://localhost:3000/posts/${post.id}`, post);
    })
}

export const applyProfileChanges = async function (data) {
    if (!data) return;

    state.authedUser.name = data.name;
    state.authedUser.city = data.city;
    state.authedUser.linkArr.splice(0, state.authedUser.linkArr.length);
    state.authedUser.linkArr.push(data.link1, data.link2);
    state.authedUser.country = data.country;
    state.authedUser.addInfo = data.addInfo;
    state.authedUser.nickname = data.name.split(' ').map(el => el.slice(0, 1)).join('').toLowerCase();

    const user = state.users.find(el => el.id === state.authedUser.id)

    user.name = state.authedUser.name;
    user.city = state.authedUser.city;
    user.country = state.authedUser.country;
    user.linkArr.splice(0, user.linkArr.length);
    user.linkArr.push(...state.authedUser.linkArr);
    user.addInfo = state.authedUser.addInfo;
    user.nickname = state.authedUser.nickname;

    await PutAJAX(`http://localhost:3000/users/${user.id}`, user);
}

export const createNewPost = async function () {
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

export const getPosts = async function () {
    const data = await (await fetch('http://localhost:3000/posts')).json();
    state.posts.push(...data);
}

const getUsers = async function () {
    const data = await (await fetch('http://localhost:3000/users')).json();
    return data;
};

export const createUsers = async function () {
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
            state.authedUser = _.cloneDeep(el);
            state.authedUser.authorized = true;
        } else {
            el.authorized = false;
        }
    });

    inputUsername.value = '';
    inputPassword.value = '';
};


