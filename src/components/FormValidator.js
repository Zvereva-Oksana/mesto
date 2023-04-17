export default class FormValidator {
    constructor(initObj, form) {
        this._initObj = initObj;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._initObj.inputSelector));
        this._buttonElement = this._form.querySelector(this._initObj.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListener();
    }

    setInitialStateForm() {
        this._toggleButtonState()
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        })
    }

    _showInputError(inputElement) {
        const errorTextElement = this._form.querySelector(`${this._initObj.inputErrorClass}${inputElement.name}`);
        errorTextElement.textContent = inputElement.validationMessage;
        if (errorTextElement.textContent.length > 35) {
            errorTextElement.classList.add(this._initObj.errorField);
        } else {
            errorTextElement.classList.remove(this._initObj.errorField);
        }
        errorTextElement.classList.add(this._initObj.errorClass);
        inputElement.classList.add(this._initObj.underlineMisspelledField);
    }

    _hideInputError(inputElement) {
        const errorTextElement = document.querySelector(`${this._initObj.inputErrorClass}${inputElement.name}`)
        errorTextElement.classList.remove(this._initObj.errorClass);
        errorTextElement.classList.remove(this._initObj.errorField)
        errorTextElement.textContent = '';
        inputElement.classList.remove(this._initObj.underlineMisspelledField);
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _setEventListener() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', (event) => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._initObj.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._initObj.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
}