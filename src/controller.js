import { DeleteAJAX } from '../helper.js';
import * as model from './model.js';
import AuthView from './View/AuthView.js';
import MessengerView from './View/MessengerView.js';
import PostsView from './View/PostsView.js';
import ProfileView from './View/ProfileView.js';

const controlSendMessage = async function(e) {
    e.preventDefault();
    const data = MessengerView.getMessageValue();
    const msgObj = await model.createMsgObject(data);
    MessengerView.printNewMessage(msgObj);
}

const controlOpenChat = function (e) {
    MessengerView.addHandlerSendMessage(controlSendMessage);//вешаем слушатель события на форму
    MessengerView.openChatWindow(e);
    const id = model.getUserById(e);//id того, с кем общаемся
    const userToChatWith = model.getUserToChatWith(id);
    MessengerView.printName(userToChatWith);
    const msgsToPrint = model.loadMessages(userToChatWith); //все сообщения для пары authedUser/userToChatWith
    MessengerView.printMessages(msgsToPrint, model.state.authedUser, userToChatWith);
}

const controlPerfromProfileChanges = async function (e) {
    e.preventDefault();
    const newData = ProfileView.getChanges();
    await model.applyProfileChanges(newData);
    ProfileView.updatePofile(model.state.authedUser);
    ProfileView.updateNav(model.state.authedUser);
    await model.updatePosts();
}

const controlChangeProfileWindow = function (e) {
    e.preventDefault();
    ProfileView.showEditProfileWindow(model.state.authedUser);
    ProfileView.addHandlerCloseEditProfileWindow();
    ProfileView.addHandlerPerformChanges(controlPerfromProfileChanges);
}

const controlDeletePost = async function (e) {
    const id = PostsView.deletePost(e);
    await DeleteAJAX(`http://localhost:3000/posts/${id}`, { id });
}

const controlPostCreation = async function (e) {
    e.preventDefault();
    const post = await model.createNewPost();
    PostsView.createNewPost(post);
    PostsView.renderDeleteBtn(model.state.posts, model.state.authedUser);
    PostsView.addHandlerDeletePost(controlDeletePost);
}

const controlPosts = async function () {
    await model.getPosts();
    PostsView.renderOldPost(model.state.posts, model.state.users);
    PostsView.addHandlerShowPostWindow();
    PostsView.addHandlerClosePostWindow();
}

const controlAuth = function (e) {
    e.preventDefault();
    model.checkAuth();
    AuthView.renderMainPage(model.state.authedUser);
    AuthView.addHandlerShowMenu();
    AuthView.addHandlerLogout(model.state);
    PostsView.renderDeleteBtn(model.state.posts, model.state.authedUser);
    AuthView.addHandlerRemoveDeleteBtn(model.state.posts, model.state.authedUser);
    AuthView.addHandlerEditProfile(controlChangeProfileWindow);
    MessengerView.loadChats(model.state.authedUser, model.state.users);
    MessengerView.addHandlerOpenChatWindow(controlOpenChat);
}

const init = async function () {
    await model.createUsers();
    AuthView.addHandlerCheckAuth(controlAuth);
    await controlPosts();
    await model.getMessages();
    PostsView.addHandlerCreateNewPost(controlPostCreation);
    PostsView.addHandlerDeletePost(controlDeletePost);

    MessengerView.addHandlerShowMessenger();
};

init();