const formEl = document.querySelector('.contact-us__form');
const successMessageEl = document.querySelector('.success-message');

const DISPLAY_SUCCESS_TIMEOUT_SECONDS = 10;
const FORM_FIELDS = ['firstname', 'lastname', 'email', 'querytype', 'message', 'callback'];

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

    formEl.reset();

    setTimeout(() => successMessageEl.classList.remove('success-message--show'), 1000 * DISPLAY_SUCCESS_TIMEOUT_SECONDS);
};

const renderErrorMessage = function (element, key) {
    let validationMessage = 'This field is required';

    if (key === 'email') validationMessage = 'Please enter a valid email address';
    if (key === 'querytype') validationMessage = 'Please select a query type';
    if (key === 'callback') validationMessage = 'To submit this form, please consent to being contacted';

    if (key !== 'querytype' && key !== 'message') {
        element.querySelector('input').setAttribute('aria-invalid', true);
        element.querySelector('input').setAttribute('aria-describedby', `${key}-error`);
    }
    if (key === 'querytype') {
        element.setAttribute('aria-invalid', true);
        element.setAttribute('aria-describedby', `${key}-error`);
    }
    if (key === 'message') {
        element.querySelector('textarea').setAttribute('aria-invalid', true);
        element.querySelector('textarea').setAttribute('aria-describedby', `${key}-error`);
    }

    element.classList.add('form-group--invalid');
    document.getElementById(`${key}-error`).textContent = validationMessage;
};

const clearErrorMessage = function (element, key) {
    if (key !== 'querytype' && key !== 'message') {
        element.querySelector('input').removeAttribute('aria-invalid');
        element.querySelector('input').removeAttribute('aria-describedby');
    }
    if (key === 'querytype') {
        element.removeAttribute('aria-invalid');
        element.removeAttribute('aria-describedby');
    }
    if (key === 'message') {
        element.querySelector('textarea').removeAttribute('aria-invalid');
        element.querySelector('textarea').removeAttribute('aria-describedby');
    }

    element.classList.remove('form-group--invalid');
    document.getElementById(`${key}-error`).textContent = '';
};

const dataIsValid = function (key, value, validations) {
    return validations[key](value);
};

const formIsValid = function (form, validations) {
    let isValid = true;
    const data = Object.fromEntries(new FormData(form));

    FORM_FIELDS.forEach(key => {
        const element = document.querySelector(`.contact-us__${key}`);

        if (!dataIsValid(key, data[key], validations)) {
            isValid = false;
            renderErrorMessage(element, key);
        } else {
            clearErrorMessage(element, key);
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
