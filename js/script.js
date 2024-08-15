const formEl = document.querySelector('.contact-us__form');
const successMessageEl = document.querySelector('.success-message');

const DISPLAY_SUCCESS_TIMEOUT_SECONDS = 10;

const validations = {
    firstname: value => !!value.trim(),
    lastname: value => !!value.trim(),
    email: value => value.trim().includes('@'),
    querytype: value => !!value,
    message: value => !!value.trim(),
    callback: value => !!value,
};

const renderSuccessMessage = function () {
    successMessageEl.classList.add('success-message--show');

    setTimeout(() => successMessageEl.classList.remove('success-message--show'), 1000 * DISPLAY_SUCCESS_TIMEOUT_SECONDS);
};

const dataIsValid = function (key, value, validations) {
    return validations[key](value);
};

const formIsValid = function (form, validations) {
    let isValid = true;
    const keys = ['firstname', 'lastname', 'email', 'querytype', 'message', 'callback'];
    const data = Object.fromEntries(new FormData(form));

    keys.forEach(key => {
        if (!dataIsValid(key, data[key], validations)) {
            isValid = false;

            const element = document.querySelector(`.contact-us__${key}`);
            element.classList.add('form-group--invalid');
            element.querySelector('.contact-us__validation-error').textContent = 'This field is required.';
        }
    });

    return isValid;
};

const handleSubmit = function (e) {
    e.preventDefault();

    if (formIsValid(e.target, validations)) {
        renderSuccessMessage();
    }
};

addEventListener('submit', handleSubmit);
