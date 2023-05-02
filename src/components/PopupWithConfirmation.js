import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._button = this._popup.querySelector('.popup__button_consent-deletion');
    }

    setEventListeners() {
        super.setEventListeners();
        this._button.addEventListener('click', () => this._handlerDeleteCard());
    }

    confirmCardDeletion(deleteCard) {
        this._handlerDeleteCard = deleteCard;
    }
}