export default class FormValidator {
    constructor(initObj, form) {
        this._initObj = initObj;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._initObj.inputSelector));
        this._buttonElement = this._form.querySelector(this._initObj.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListener();
        this._clearErrorsMessage();
    }

    _clearErrorsMessage() {
        const errorTextElementList = this._form.querySelectorAll('.popup__input-error_visible');
        if (errorTextElementList.length > 0) {
            this._inputList.forEach(input => {
                this._hideInputError(input);
            })
        }
    }

    _showInputError(input) {
        const errorTextElement = this._form.querySelector(`${this._initObj.inputErrorClass}${input.name}`);
        if (input.value.length === 0) {
            errorTextElement.textContent = 'Вы пропустили это поле.';
            errorTextElement.classList.remove('popup__input-error_all-field')
        } else if (input.value.length > 0 && input.type === 'url') {
            errorTextElement.textContent = 'Введите адрес сайта.'
        } else {
            errorTextElement.textContent = `Минимальное количество символов ${input.minLength}. Длина текста сейчас: ${input.value.length} символ.`;
            errorTextElement.classList.add('popup__input-error_all-field')
        }
        errorTextElement.classList.add(this._initObj.errorClass);
        input.classList.add('popup__input_invalid');
    }

    _hideInputError(input) {
        const errorTextElement = document.querySelector(`${this._initObj.inputErrorClass}${input.name}`)
        errorTextElement.classList.remove(this._initObj.errorClass);
        errorTextElement.classList.remove('popup__input-error_all-field')
        errorTextElement.textContent = '';
        input.classList.remove('popup__input_invalid');
    }

    _checkInputValidity(input) {
        if (!input.validity.valid) {
            this._showInputError(input);
        } else {
            this._hideInputError(input);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !input.validity.valid;
        })
    }

    _setEventListener() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
        });
        this._inputList.forEach((input) => {
            input.addEventListener('input', (event) => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            })
        })
        this._toggleButtonState();
    }

    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._initObj.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._initObj.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
}