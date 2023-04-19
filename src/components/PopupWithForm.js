import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._formSubmit = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._dataAllFormFields = {}
        this._inputList.forEach((input) => {
            this._dataAllFormFields[input.name] = input.value
        })
        return this._dataAllFormFields;
    }

    getFormElement() {
        return this._popupForm;
    }

    setEventListeners() {
        super.setEventListeners()
        this._popupForm.addEventListener('submit', (event) => this._formSubmit(event, this._getInputValues()))
    }

    close() {
        super.close();
        this._popupForm.reset()
    }
}
