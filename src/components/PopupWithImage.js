import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.picture-popup__img');
        this._name = this._popup.querySelector('.picture-popup__figcaption');
    }

    open(imageName, imageLink) {
        this._image.src = imageLink;
        this._image.alt = imageName;
        this._name.textContent = imageName;
        super.open();
    }
}
