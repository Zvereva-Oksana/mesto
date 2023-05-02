export default class Card {
    constructor(data, template, openPopupPicture, userId, removeCard, addLikeFetch, removeLikeFetch) {
        this._name = data.name;
        this._id = data['_id'];
        this._link = data.link;
        this._ownerId = data.owner['_id'];
        this._userId = userId;
        this._countLikes = data.likes;
        this._template = template;
        this._openPopupPicture = openPopupPicture;
        this._removeCard = removeCard;
        this._addLikeFetch = addLikeFetch;
        this._removeLikeFetch = removeLikeFetch;
    }

    setCountLikes(data) {
        this._countLikes = data.likes || [];
    }

    _getTemplate() {
        return document.querySelector(this._template).content.querySelector('.card').cloneNode(true);
    }

    _toggleLikeClick() {
        if (!this._checkUserLike()) {
            this._addLikeFetch();
        } else {
            this._removeLikeFetch()
        }
    }

    addLikeOnCard() {
        this._likeButton.classList.add('card__vector_active');
    }

    removeLikeOnCard() {
        this._likeButton.classList.remove('card__vector_active');
    }

    renderCountLikesByCard(data) {
        this._cardElementToDisplayCountOfLikes.textContent = data.likes.length;
    }

    _checkUserLike() {
        return this._countLikes.some((item) => item._id === this._userId);
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._toggleLikeClick();
        });
        this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
            this._removeCard(evt);
        });
        this._cardImage.addEventListener('click', () => this._openPopupPicture());
    }

    getCardId() {
        return this._id
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.card__mask');
        this._likeButton = this._element.querySelector('.card__vector');
        if (this._checkUserLike()) {
            this._likeButton.classList.add('card__vector_active');
        }
        this._cardElementToDisplayCountOfLikes = this._element.querySelector('.card__count-likes');
        this._buttonDelete = this._element.querySelector('.card__delete');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElementToDisplayCountOfLikes.textContent = this._countLikes.length;
        this._element.querySelector('.card__name').textContent = this._name;
        this._element.id = this._id;
        this._setEventListeners();
        if (this._userId !== this._ownerId) {
            this._buttonDelete.remove()
        }
        return this._element;
    }
}