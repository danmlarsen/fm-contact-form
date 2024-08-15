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
            let validationMessage = 'This field is required.';

            if (key === 'email') validationMessage = 'Please enter a valid email address';
            if (key === 'querytype') validationMessage = 'Please select a query type';
            if (key === 'callback') validationMessage = 'To submit this form, please consent to being contacted';

            element.classList.add('form-group--invalid');
            element.querySelector('.contact-us__validation-error').textContent = validationMessage;
        } else {
            element.classList.remove('form-group--invalid');
            element.querySelector('.contact-us__validation-error').textContent = '';
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
