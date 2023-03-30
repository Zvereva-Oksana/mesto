import {openPopup} from './index.js'

export default class Card {
    constructor(name, link) {
        this._name = name;
        this._link = link;
    }

    _getTemplate() {
        const cardElement = document.querySelector('.template').content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _handleOpenPopup() {
        const popupPicture = document.querySelector('.picture-popup');
        const screensaverPopupPicture = popupPicture.querySelector('.picture-popup__img');
        screensaverPopupPicture.src = this._link;
        screensaverPopupPicture.alt = this._name;
        popupPicture.querySelector('.picture-popup__figcaption').textContent = this._name;
        openPopup(popupPicture);
    }

    _handlDeleteCard() {
        this._element.remove();
    }

    _handleLikeClick() {
        this._element.querySelector('.card__vector').classList.toggle('card__vector_active');
    }

    _setEventListeners() {
        this._element.querySelector('.card__mask').addEventListener('click', () => {
            this._handleOpenPopup();
        });
        this._element.querySelector('.card__vector').addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._handlDeleteCard();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardMask = this._element.querySelector('.card__mask');
        this._cardMask.src = this._link;
        this._cardMask.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}