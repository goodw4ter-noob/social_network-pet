class MessengerView {
    _mainPageWrapper = document.querySelector('.main-page-wrapper');
    _showMessengerbBtn = document.querySelector('.show-messenger-btn');
    _messengerWrapper = document.querySelector('.messenger-wrapper ');
    _messengerExitBtn = document.querySelector('.messenger-exit-btn');
    _usersList = document.querySelector('.users-list');
    _userTopBarName = document.querySelector('.user-top-bar-name');
    _messengerList = document.querySelector('.messages-list');
    _welcomeMessage = document.querySelector('.welcome-message');
    _messengerForm = document.querySelector('.messenger-form');
    _messengerFrom = document.querySelector('.messenger-form');
    _messengerTextarea = document.querySelector('.messenger-textarea');
    _userRow = '';

    _data = '';
    _userToChatWith = '';
    _authedUser = '';


    addHandlerShowMessenger() {
        [this._showMessengerbBtn, this._messengerExitBtn].forEach(btn => btn.addEventListener('click', this._toggleMessenger.bind(this)));
    }

    addHandlerSendMessage(handler) {
        this._messengerFrom.addEventListener('submit', handler);
    }

    addHandlerOpenChatWindow(handler) {
        this._userRow.forEach(row => row.addEventListener('click', handler));
    }

    printNewMessage(msg) {
        const markup = `
            <div class="message-block-big" id="${msg.id}">
                <div class="outside-container-big">
                    <span class="messenger-username">${this._authedUser.name} @${this._authedUser.nickname}</span>
                    <span class="messageDateInside-big">${msg.time}</span>
                </div>
                <span class="messageTextInside-big">${msg.text}</span>
            </div>
        `;

        this._messengerList.insertAdjacentHTML('beforeend', markup);
        this._messengerTextarea.value = '';
    }

    getMessageValue() {
        const msg = this._messengerTextarea.value;
        return {
            text: msg,
            userToChatWith: this._userToChatWith,
        };
    }

    openChatWindow(e) {
        this._userRow.forEach(row => row.classList.remove('active'));
        e.target.closest(".user-row").classList.add('active');
        this._welcomeMessage.classList.add('hidden');
        this._messengerForm.classList.remove('hidden');
    }

    printName(user) {
        this._userTopBarName.textContent = `${user.name} @${(user.nickname).toUpperCase()}`;
    }

    _toggleMessenger() {
        this._messengerWrapper.classList.toggle('hidden');
        this._mainPageWrapper.classList.toggle('hidden');
    }

    printMessages(msgs, authedUser, userToChatWith) {
        if (this._data == userToChatWith.id) return;

        this._messengerList.textContent = '';

        this._data = userToChatWith.id;
        this._userToChatWith = userToChatWith;
        this._authedUser = authedUser;

        msgs.forEach(msg => {
            if (msg.from == authedUser.id) {
                const markup = `
                    <div class="message-block-big" id="${msg.id}">
                        <div class="outside-container-big">
                            <span class="messenger-username">${authedUser.name} @${authedUser.nickname}</span>
                            <span class="messageDateInside-big">${msg.time}</span>
                        </div>
                        <span class="messageTextInside-big">${msg.text}</span>
                    </div>
                `;

                this._messengerList.insertAdjacentHTML('beforeend', markup);
            } else {
                const markup = `
                    <div class="message-block-big" id="${msg.id}">
                        <div class="outside-container-big">
                            <span class="messenger-username">${userToChatWith.name} @${userToChatWith.nickname}</span>
                            <span class="messageDateInside-big">${msg.time}</span>
                        </div>
                        <span class="messageTextInside-big">${msg.text}</span>
                    </div>
                `;

                this._messengerList.insertAdjacentHTML('beforeend', markup);
            }
        })
    }

    loadChats(authedUser, users) {
        users.forEach(user => {
            if (user.id === authedUser.id) return;
            const chat = `
            <a href="#${user.id}" class="user-row">
                <img src="${user.img}" alt="user-row-img" class="user-row-photo">
                <span class="user-row-name">${user.name} @ ${(user.nickname).toUpperCase()}</span>
            </a>
            `;

            this._usersList.insertAdjacentHTML('beforeend', chat);
        })
        this._userRow = document.querySelectorAll('.user-row');
    }
}

export default new MessengerView();

