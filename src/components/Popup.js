export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleCloseEsc = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.remove('popup_close')
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleCloseEsc);
    }

    close() {
        this._popup.classList.add('popup_close');
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleCloseEsc);
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