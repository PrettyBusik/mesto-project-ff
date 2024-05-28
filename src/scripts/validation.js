const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.getAttribute('data-error-message'));
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement, config);
    }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
};



const setEventListener = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    setButtonStateAccordingToValidationResult(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {

            isValid(formElement, inputElement, config);
            setButtonStateAccordingToValidationResult(inputList, buttonElement, config);
        })
    })
};


export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListener(formElement, config);
    })
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const setButtonState = (isEnabled, buttonElement, config) => {
    if (isEnabled) {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    }
}

const setButtonStateAccordingToValidationResult = (inputList, buttonElement, config) => {
    const isFormValid = !hasInvalidInput(inputList);
    setButtonState(isFormValid, buttonElement, config);
};

export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    })
    setButtonStateAccordingToValidationResult(inputList, submitButton, config)
}

