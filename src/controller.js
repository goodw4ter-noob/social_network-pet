import { DeleteAJAX } from '../helper.js';
import * as model from './model.js';
import AuthView from './View/AuthView.js';
import PostsView from './View/PostsView.js';

const controlDeletePost = async function(e) {
    const id = PostsView.deletePost(e);
    await DeleteAJAX(`http://localhost:3000/posts/${id}`, { id });
}

const controlPostCreation = async function(e) {
    e.preventDefault();
    const post = await model.createNewPost();
    PostsView.createNewPost(post);
    PostsView.renderDeleteBtn(model.state.posts, model.state.authedUser);
    PostsView.addHandlerDeletePost(controlDeletePost);
}

const controlPosts = async function() {
    await model.getPosts();
    PostsView.renderOldPost(model.state.posts);
    console.log(model.state.posts);
    PostsView.addHandlerShowPostWindow();
    PostsView.addHandlerClosePostWindow();
}

const controlAuth = function(e) {
    e.preventDefault();
    model.checkAuth();
    AuthView.render(model.state.authedUser);
    AuthView.addHandlerShowMenu();
    AuthView.addHandlerLogout(model.state);
    PostsView.renderDeleteBtn(model.state.posts, model.state.authedUser);
}

const init = async function () {
    model.createUsers();
    AuthView.addHandlerCheckAuth(controlAuth);
    await controlPosts();
    PostsView.addHandlerCreateNewPost(controlPostCreation);
    PostsView.addHandlerDeletePost(controlDeletePost);
};

init();