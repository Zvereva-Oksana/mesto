const showInputError = (errorTextElement, errorClass, input) => {
    if (input.value.length === 0) {
        errorTextElement.textContent = 'Вы пропустили это поле.';
        errorTextElement.classList.remove('popup__input-error_all-field')
    } else if (input.value.length > 0 && input.type === 'url') {
        errorTextElement.textContent = 'Введите адрес сайта.'
    } else {
        errorTextElement.textContent = `Минимальное количество символов ${input.minLength}. Длина текста сейчас: ${input.value.length} символ.`;
        errorTextElement.classList.add('popup__input-error_all-field')
    }
    errorTextElement.classList.add(errorClass);
    input.classList.add('popup__input_invalid');
}

const hideInputError = (errorTextElement, errorClass, input) => {
    errorTextElement.classList.remove(errorClass);
    errorTextElement.classList.remove('popup__input-error_all-field')
    errorTextElement.textContent = '';
    input.classList.remove('popup__input_invalid')
};

export const checkInputValidity = (input, {inputErrorClass, errorClass}) => {
    const errorTextElement = document.querySelector(`${inputErrorClass}${input.name}`)
    if (!input.validity.valid) {
        showInputError(errorTextElement, errorClass, input);
    } else {
        hideInputError(errorTextElement, errorClass, input);
    }
};

const disabledButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

const enableButton = (submitButton, inactiveButtonClass) => {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

const hasInvalidInput = (inputList) => {
    return Array.from(inputList).some((input) => {
        return !input.validity.valid;
    })
}

export const toggleButtonState = (submitButton, inactiveButtonClass, inputList) => {
    if (hasInvalidInput(inputList)) {
        disabledButton(submitButton, inactiveButtonClass)
    } else {
        enableButton(submitButton, inactiveButtonClass);
    }
}

const setEventListener = (form, className) => {
    const inputList = form.querySelectorAll(className.inputSelector);
    const submitButton = form.querySelector(className.submitButtonSelector);
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    inputList.forEach((input) => {
        input.addEventListener('input', (event) => {
            checkInputValidity(event.target, className);
            toggleButtonState(submitButton, className.inactiveButtonClass, inputList);
        })
    })
}

export const enableValidation = (className) => {
    const formArray = document.querySelectorAll(className.formSelector);
    formArray.forEach((form) => {
        setEventListener(form, className);
    })
}