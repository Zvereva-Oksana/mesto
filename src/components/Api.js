export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        const Url = `${this._baseUrl}/users/me`;
        return fetch(Url, {
            headers: this._headers
        })
            .then(this._checkRes)
    }

    getInitialCards() {
        const Url = `${this._baseUrl}/cards`
        return fetch(Url, {
            headers: this._headers
        })
            .then(this._checkRes)
    }

    addNewCard(cardData) {
        const Url = `${this._baseUrl}/cards`;
        return fetch(Url, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(cardData)
        })
            .then(this._checkRes)
    }

    addInfoUser(infoData) {
        const Url = `${this._baseUrl}/users/me`;
        return fetch(Url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(infoData)
        })
            .then(this._checkRes)
    }

    deleteCard(cardId) {
        const Url = `${this._baseUrl}/cards/${cardId}`;
        return fetch(Url, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    addLikeCard(cardId) {
        const Url = `${this._baseUrl}/cards/${cardId}/likes`;
        return fetch(Url, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    deleteLikeCard(cardId) {
        const Url = `${this._baseUrl}/cards/${cardId}/likes`;
        return fetch(Url, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkRes)
    }

    editUserAvatar(avatar) {
        const Url = `${this._baseUrl}/users/me/avatar`;
        return fetch(Url, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(avatar)
        })
            .then(this._checkRes)
    }
}

