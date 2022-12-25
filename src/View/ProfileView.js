class ProfileView {
    _editProfileBtn = document.querySelector('.edit-button-wrapper');

    addHandlerEditInfo(handler) {
        this._editProfileBtn.addEventListener('click', handler);
    }

    
}