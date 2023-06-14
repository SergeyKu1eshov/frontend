import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
    usersPath: () => '/users',
};

const schema = yup.object().shape({
    name: yup.string().trim().required(),
    email: yup.string().required('email must be a valid email').email(),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string()
        .required('password confirmation is a required field')
        .oneOf(
            [yup.ref('password'), null],
            'password confirmation does not match to password',
        ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
    network: {
        error: 'Network Problems. Try again.',
    },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
    try {
        schema.validateSync(fields, { abortEarly: false });
        return {};
    } catch (e) {
        return keyBy(e.inner, 'path');
    }
};

// BEGIN
export default () => {
    let frames = Array.from(document.querySelector("form[data-form=sign-up]").querySelectorAll(".form-group"));
    let [name_form, email_form, password_form, password_confirm_form] = frames;
    let [name_input, email_input, password_input, password_confirm_input] = frames.map(el => el.querySelector("input"));
    let submit_button = document.querySelector("input[type=submit]");
    let frames_messages = {
        name: document.createElement("div"),
        email: document.createElement("div"),
        password: document.createElement("div"),
        passwordConfirmation: document.createElement("div")
    };

    const checkvalid = () => {
        let messages = validate(validation);
        let text;
        if ("name" in messages) {
            if (name_form.querySelector("div") == null) {
                text = document.createTextNode(messages.name);
                frames_messages.name.append(text);
                frames_messages.name.classList.add("invalid-feedback");
                name_input.classList.add("is-invalid");
                name_form.append(frames_messages.name);
            }
            if (name_input.value == "") {
                frames_messages.name.remove();
                name_input.classList.remove("is-invalid");
                frames_messages.name = document.createElement("div");
            }
        } else {
            frames_messages.name.remove();
            name_input.classList.remove("is-invalid");
            frames_messages.name = document.createElement("div");
        }
        if ("email" in messages) {
            if (email_form.querySelector("div") == null) {
                text = document.createTextNode(messages.email);
                frames_messages.email.append(text);
                frames_messages.email.classList.add("invalid-feedback");
                email_input.classList.add("is-invalid");
                email_form.append(frames_messages.email);
            }
            if (email_input.value == "") {
                frames_messages.email.remove();
                email_input.classList.remove("is-invalid");
                frames_messages.email = document.createElement("div");
            }
        } else {
            frames_messages.email.remove();
            email_input.classList.remove("is-invalid");
            frames_messages.email = document.createElement("div");
        }
        if ("password" in messages) {
            if (password_form.querySelector("div") == null) {
                text = document.createTextNode(messages.password);
                frames_messages.password.append(text);
                frames_messages.password.classList.add("invalid-feedback");
                password_input.classList.add("is-invalid");
                password_form.append(frames_messages.password);
            }
            if (password_input.value == "") {
                frames_messages.password.remove();
                password_input.classList.remove("is-invalid");
                frames_messages.password = document.createElement("div");
            }
        } else {
            frames_messages.password.remove();
            password_input.classList.remove("is-invalid");
            frames_messages.password = document.createElement("div");
        }
        if ("passwordConfirmation" in messages) {
            if (password_confirm_form.querySelector("div") == null) {
                text = document.createTextNode(messages.passwordConfirmation);
                frames_messages.passwordConfirmation.append(text);
                frames_messages.passwordConfirmation.classList.add("invalid-feedback");
                password_confirm_input.classList.add("is-invalid");
                password_confirm_form.append(frames_messages.passwordConfirmation);
            }
            if (password_confirm_input.value == "") {
                frames_messages.passwordConfirmation.remove();
                password_confirm_input.classList.remove("is-invalid");
                frames_messages.passwordConfirmation = document.createElement("div");
            }
        } else {
            frames_messages.passwordConfirmation.remove();
            password_confirm_input.classList.remove("is-invalid");
            frames_messages.passwordConfirmation = document.createElement("div");
        }
        if (!Object.keys(messages).length)
            submit_button.removeAttribute("disabled", "");
        else
            submit_button.setAttribute("disabled", "")
    };

    let validation = { name: "", email: "", password: "", passwordConfirmation: "" };
    let watchedvalidation = onChange(validation, checkvalid);
    name_input.addEventListener("input", () => {
        watchedvalidation.name = name_input.value;
    });
    email_input.addEventListener("input", () => {
        watchedvalidation.email = email_input.value;
    });
    password_input.addEventListener("input", () => {
        watchedvalidation.password = password_input.value;
    });
    password_confirm_input.addEventListener("input", () => {
        watchedvalidation.passwordConfirmation = password_confirm_input.value;
    });
    // checkvalid();
    submit_button.addEventListener("click", async() => {
        submit_button.setAttribute("disabled", "");
        let response = await axios.post(routes.usersPath(), validation);
        document.querySelector("form[data-form=sign-up]").remove();
        document.querySelector("div[data-container=sign-up]").append(document.createTextNode("User Created!"));
    });
};
// END