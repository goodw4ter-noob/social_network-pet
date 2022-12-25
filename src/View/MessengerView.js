
class MessengerView {

    _bigArea = document.querySelector('.textarea-big');
    _send = document.querySelector('.messenger-form');
    _messengerArea = document.querySelector('.messenger-area');
    _data;

    addHandlerPrintMessage(handler, data) {
        this._send.addEventListener('submit', handler);
        this._data = data;
    }

    render() {
        if (this._data.messages.length === 0) return;
        console.log(this._data);
        const markup = this._generateMarkup(this._data);
        this._messengerArea.insertAdjacentHTML('beforeend', markup);
    }

    _generateMarkup(state) {
        const msgToShow = `
        <div class="message-block-big">
            <div class="outside-container-big">
                <span class="username">${state.user}</span>
                <span class="messageDateInside-big">${state.messages[state.messages.length - 1].date}</span>
            </div>
            <span class="messageTextInside-big">${state.messages[state.messages.length - 1].text}</span>
        </div>
    `;
        return msgToShow;
    }
}

export default new MessengerView();