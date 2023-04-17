import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupElement, formSubmit) {
        super(popupElement);
        this._formSubmit = formSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._dataAllFormFields = {}
        this._inputList.forEach((input) => {
            this._dataAllFormFields[input.name] = input.value
        })
        return this._dataAllFormFields;
    }

    getFormValues() {
        return this._getInputValues();
    }

    getFormElement() {
        return this._formElement;
    }

    setEventListeners() {
        super.setEventListeners()
        this._formElement.addEventListener('submit', (event) => this._formSubmit(event))
    }

    close() {
        super.close();
        this._formElement.reset()
    }
}
