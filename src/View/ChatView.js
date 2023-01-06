
class ChatView {
    _data;

    _msgWrapper = document.querySelector('.messageWrapper');
    _alert = document.querySelector('.alert-wrapper');
    _form = document.querySelector('.chat-form');
    _sideChat = document.querySelector('.side-chat');
    _historyFlow = document.querySelector('.history-flow');
   
    addHandlerSend(handler, data) {
        this._form.addEventListener('submit', handler);
        this._data = data;
    };

    addHandlerShowAlert() {
        if (!this._historyFlow.classList.contains('hidden')) return;
        this._alert.classList.remove('hidden');

    }

    addHandlerShowMessages() {
        this._alert.addEventListener('click', this._render.bind(this))
    };

    addHandlerPrintOneMessage(message) {
        if (!message) return;
        if (!this._alert.classList.contains('hidden')) return;
        const element = this._data[this._data.length - 1];
        const markup = this._generateMarkup(element);
        this._msgWrapper.insertAdjacentHTML('beforeend', markup);
    }

    _render() {
        const markup = this._data.map(el => this._generateMarkup(el)).join('');
        this._msgWrapper.insertAdjacentHTML('beforeend', markup);
        this._alert.classList.add('hidden');
        this._historyFlow.classList.remove('hidden');
    };

    _generateMarkup(data) {
        const msgToShow = `
            <div class="message-block">
                <div class="inside-container">
                    <span class="messageTextInside">${data.text}</span>
                    <span class="messageDateInside">${data.date}</span>
                </div>
            </div>
    `;
        return msgToShow;
    };
}

// export default new ChatView();