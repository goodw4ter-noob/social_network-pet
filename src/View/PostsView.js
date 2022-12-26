import { postTextarea } from "../../helper.js";

class PostsView {
    _parentElement = document.querySelector('.main-page-messages');
    _createPostBtn = document.querySelector('.create-post-btn');
    _createPostsWrapper = document.querySelector('.create-posts-wrapper');
    _createPostForm = document.querySelector('.create-post-form');
    _closeFormButton = document.querySelector('.close-form-button');
    _createPostsBackground = document.querySelector('.create-posts-background');
    _exitButton = document.querySelector('.exit-button');
    _messageRowDeletePostBtn = '';
    _body = document.querySelector('body');

    addHandlerShowPostWindow() {
        this._createPostBtn.addEventListener('click', this._showPostWindow.bind(this));
    }

    addHandlerClosePostWindow() {
        [this._createPostsBackground, this._closeFormButton].forEach(btn => btn.addEventListener('click', this._closePostWindow.bind(this)));
    }

    addHandlerCreateNewPost(handler) {
        this._createPostForm.addEventListener('submit', handler);
    }

    addHandlerDeletePost(handler) {
        this._messageRowDeletePostBtn.forEach(btn => btn.addEventListener('click', handler));
    }

    renderOldPost(posts) {
        const oldPosts = posts.map(post => {
            return `
            <div class="message-row" id="${post.id}" data-id="${post.id}">
                <div class="message-row-wrapper">  
                    <div class="message-raw-block">
                        <span class="message-row-name">${post.author.nickname}</span>
                        <span class="message-row-date">${post.time}</span>
                    </div>
                    <span class="message-row-text">${post.text}</span>
                </div>
                <div class="message-row-delete-post-btn post-by-user-${post.author.id} hidden">
                    <img src="/img/svg/deletepost.svg" alt="deletePost" class="delete-post-btn">
                </div>
            </div>
            `;
        }).join('');

        this._parentElement.insertAdjacentHTML('beforeend', oldPosts);
        this._messageRowDeletePostBtn = document.querySelectorAll('.message-row-delete-post-btn');
    }

    renderDeleteBtn(posts, authedUser) {
        const { id = authedUser.id } = posts.find(post => post.author.id === authedUser.id);
        const postsToChange = document.querySelectorAll(`.post-by-user-${id}`);
        postsToChange.forEach(post => post.classList.remove('hidden'));
    }

    deletePost(e) {
        const postToDelete = e.target.closest('.message-row');
        this._parentElement.removeChild(postToDelete);
        return postToDelete.dataset.id;
    }

    createNewPost(post) {
        const posting = `
        <div class="message-row" id="${post.id}" data-id="${post.id}">
                <div class="message-row-wrapper">  
                    <div class="message-raw-block">
                        <span class="message-row-name">${post.author.nickname}</span>
                        <span class="message-row-date">${post.time}</span>
                    </div>
                    <span class="message-row-text">${post.text}</span>
                </div>
                <div class="message-row-delete-post-btn post-by-user-${post.author.id} hidden">
                    <img src="/img/svg/deletepost.svg" alt="deletePost" class="delete-post-btn">
                </div>
            </div>
        `;
        this._parentElement.insertAdjacentHTML('afterbegin', posting);
        this._createPostsWrapper.classList.add('hidden');
        postTextarea.value = '';
        this._body.style.overflow = '';
        this._messageRowDeletePostBtn = document.querySelectorAll('.message-row-delete-post-btn');
        console.log(this._messageRowDeletePostBtn);
    }

    _showPostWindow() {
        this._createPostsWrapper.classList.remove('hidden');
        this._body.style.overflow = 'hidden';
    }

    _closePostWindow() {
        this._createPostsWrapper.classList.add('hidden');
        this._body.style.overflow = '';
    }
}

export default new PostsView();