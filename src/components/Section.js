export default class Section {
    constructor({renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addCard(element) {
        this._container.prepend(element);
    }

    renderCards(cards) {
        cards.reverse().forEach((card) => {
            this._renderer(card)
        })
    }
}