export default class Popup {
    constructor(popupElement) {
        this._popup = document.querySelector(popupElement);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-icon')) {
                this.close();
            }
        })
    }
}