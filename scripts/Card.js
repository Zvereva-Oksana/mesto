import {handleOpenPopup} from './index.js'

export default class Card {
    constructor(data, template) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
    }

    _getTemplate() {
        return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    }

    _handlDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handleLikeClick() {
        this._element.querySelector('.card__vector').classList.toggle('card__vector_active');
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            handleOpenPopup(this._cardImage.src, this._cardImage.alt);
        });
        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._handlDeleteCard();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__mask');
        this._likeButton = this._element.querySelector('.card__vector');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}