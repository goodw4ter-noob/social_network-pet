
class ProfileView {
    _changeProfileWrapper = document.querySelector('.change-profile-wrapper');
    _changeProfileBackground = document.querySelector('.change-profile-background');
    _closeChangeProfileButton = document.querySelector('.close-change-profile-button');
    _changeProfileForm = document.querySelector('.change-profile-form');
    _body = document.querySelector('body');
    _nameTextarea = document.querySelector('.name-textarea');
    _countryTextarea = document.querySelector('.country-textarea');
    _cityTextarea = document.querySelector('.city-textarea');
    _link1Textarea = document.querySelector('.link1-textarea');
    _link2Textarea = document.querySelector('.link2-textarea');
    _addInfoTextarea = document.querySelector('.add-info-textarea');
    _welcome = document.querySelector('.welcome');

    addHandlerCloseEditProfileWindow() {
        [this._changeProfileBackground, this._closeChangeProfileButton].forEach(btn => btn.addEventListener('click', this._closeEditProfileWindow.bind(this)));
    }

    addHandlerPerformChanges (handler) {
        this._changeProfileForm.addEventListener('submit', handler);
    }

    updatePofile(user) {
        const newMarkup = `
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
                <span>${user.addInfo}</span>
            </div>
            <div class="main-page-profile-row mpp-links">
                <div class="link1">
                <a
                    href="${user.linkArr[0]}">${user.linkArr[0]}</a>
                </div>
                <div class="link2">
                <a
                    href="${user.linkArr[1]}">${user.linkArr[1]}</a>
                </div>
            </div>
        `;

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(document.querySelector('.main-page-profile').querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
			const curEl = curElements[i];

			//Update changed TEXT
			if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }
		});
    }

    updateNav(user) {
        this._welcome.textContent = `Welcome back, ${(user.name).split(' ')[0]}!`;
        const newNav = `
            <img src="${user.img}" alt="photo" class="profile-photo">
                <div class="selected">
                    <span class="top-nickname">${(user.nickname).toUpperCase()}</span>
                    <i class="fa-solid fa-arrow-down"></i>
                </div>
                <ul class="profile-menu hidden">
                    <li>Change theme</li>
                    <li class="exit-button">Exit</li>
                </ul>
        `;

        const newDOM = document.createRange().createContextualFragment(newNav);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(document.querySelector('.top-profile').querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
			const curEl = curElements[i];

			//Update changed TEXT
			if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            }
		});
    }

    getChanges() {
        const newData = {
            name: this._nameTextarea.value.trim(),
            city: this._cityTextarea.value.trim(),
            country: this._countryTextarea.value.trim(),
            link1: this._link1Textarea.value.trim(),
            link2: this._link2Textarea.value.trim(),
            addInfo: this._addInfoTextarea.value.trim(),
        }

        if (Object.entries(newData).some(el => el[1] == '')) return;

        this._closeEditProfileWindow();
        return newData;
    }

    showEditProfileWindow(user) {
        this._changeProfileWrapper.classList.remove('hidden');
        this._body.style.overflow = 'hidden';
        this._nameTextarea.textContent = user.name
        this._cityTextarea.textContent = user.city
        this._countryTextarea.textContent = user.country
        this._addInfoTextarea.textContent = user.addInfo;
        this._link1Textarea.textContent = user.linkArr[0];
        this._link2Textarea.textContent = user.linkArr[1];
    }

    _closeEditProfileWindow() {
        this._changeProfileWrapper.classList.add('hidden');
        this._body.style.overflow = '';
    }


}

export default new ProfileView();