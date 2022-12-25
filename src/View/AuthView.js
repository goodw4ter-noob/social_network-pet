import View from "./View.js";

class AuthView extends View {
    _parentElement = document.querySelector('.login');
    _welcome = document.querySelector('.welcome');
    _nav = document.querySelector('nav');
    _login = document.querySelector('.login');
    _body = document.querySelector('body');
    _mainPageWrapper = document.querySelector('.main-page-wrapper');
    _authedUser = '';

    _profile = '';
    _mppLinks = '';
    _arrow = '';
    _prof = '';
    _selected = '';
    _exitBtn = '';
    _topProfile = '';

    addHandlerCheckAuth(handler) {
        this._parentElement.addEventListener('submit', handler);
    }

    addHandlerLogout(state) {
        this._exitBtn.addEventListener('click', () => { this._logout(state) })
    }

    addHandlerShowMenu() {
        this._selected.addEventListener('click', this._toggleMenu.bind(this));
    }

    render(user) {
        if (!user) return;
        this._authedUser = user;
        this._login.classList.add('hidden');
        this._welcome.textContent = `Welcome back, ${(user.name).split(' ')[0]}!`;
        const topBar = `
        <div class="top-profile">
            <img src="${user.img}" alt="photo" class="profile-photo">
                <div class="selected">
                    <span class="top-nickname">${(user.nickname).toUpperCase()}</span>
                    <i class="fa-solid fa-arrow-down"></i>
                </div>
                <ul class="profile-menu hidden">
                    <li>Change theme</li>
                    <li class="exit-button">Exit</li>
                </ul>
        </div>
        `;
        this._nav.insertAdjacentHTML('beforeend', topBar);

        const profile = `
        <div class="main-page-profile">
            <div class="main-page-profile-photo">
                <img src="${user.img}" alt="imag" class="profile-image">
            </div>
            <div class="main-page-profile-row mpp-name">
                <span>${user.name}</span>
                <div class="edit-button-wrapper">
                    <img src="/img/svg/edit.svg" alt="edit" class="edit-button">
                </div>
                <div class="main-page-profile-row mpp-location">
                    <span>${user.city}, ${user.country}</span>
                    <img src="${user.flag}" alt="" class="flag">
                </div>
            </div>
            <div class="main-page-profile-row mpp-info">
                <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur hic, non animi in quae
                    blanditiis distinctio aspernatur dolores voluptates fuga vero dolorum quisquam eos rem, asperiores
                    quo praesentium, repellat quos quod autem nobis dolorem debitis ea dolore. Beatae, cupiditate ea?
                </span>
            </div>
            <div class="main-page-profile-row mpp-links">
                
            </div>
        </div>
        `;

        const links = user.links.map(link => {
            return `
                <div class="link1">
                <a
                    href="${link}">${link}</a>
                </div>
            `;
        }).join('');

        this._mainPageWrapper.insertAdjacentHTML('afterbegin', profile);
        this._profile = document.querySelector('.main-page-profile');
        this._mppLinks = document.querySelector('.mpp-links');
        this._mppLinks.insertAdjacentHTML('beforeend', links);
        this._mainPageWrapper.classList.remove('hidden');


        this._arrow = document.querySelector('.fa-arrow-down');
        this._prof = document.querySelector('.profile-menu');
        this._selected = document.querySelector('.selected');
        this._exitBtn = document.querySelector('.exit-button');
        this._topProfile = document.querySelector('.top-profile');
    }

    _logout(state) {
        state.users.forEach(el => {
            if (el.name === this._authedUser.name) {
                el.authorized = false;
                this._authedUser = '';
                state.authedUser = '';
            }
        });
        this._login.classList.remove('hidden');
        this._nav.removeChild(this._topProfile);
        this._mainPageWrapper.removeChild(this._profile);
        this._mainPageWrapper.classList.add('hidden');
        this._welcome.textContent = 'Log in to get started';
    }

    _toggleMenu() {
        this._prof.classList.toggle('hidden');
        this._arrow.classList.toggle('rotate');
    }
}

export default new AuthView();