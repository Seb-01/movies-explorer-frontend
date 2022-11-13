import React from "react";
import "./Register.css";
import logoRegister from "../../images/logo_header.svg";
import { Link } from "react-router-dom";

function Register(props) {
  return (
    <>
      <section className="form__reg-login-container">
        <form name={props.name} onSubmit={props.onSubmit}>
          <div className="form__reg-login-logo">
            <img src={logoRegister} alt="Лого Movies-Explorer" />
          </div>
          <h2 className="form__reg-login-title">{props.title}</h2>

          <fieldset className="form__info">
            <label className="form__field">
              Имя
              <input
                id="register-name-input"
                type="text"
                className="form__input"
                value={props.name}
                name="name"
                placeholder="Введите Ваше имя"
                minlenght="2"
                maxlenght="40"
                required
                onChange={props.onChange}
              />
            </label>
            <label className="form__field">
              E-mail
              <input
                id="register-email-input"
                type="email"
                className="form__input"
                value={props.email}
                name="email"
                placeholder="email"
                minlenght="2"
                maxlenght="200"
                required
                onChange={props.onChange}
              />
            </label>
            <label className="form__field">
              Пароль
              <input
                id="register-password-input"
                type="password"
                className="form__input form__input_text-color-red"
                value={props.password}
                name="password"
                placeholder="Пароль"
                minlenght="2"
                maxlenght="200"
                required
                onChange={props.onChange}
              />
              <span className="form__input-error">Место вывода ошибки</span>
            </label>
          </fieldset>

          <button className="form__reg-login-submit-button" type="submit">
            {props.buttonSubmitText}
          </button>
          <div className="form__reg-login-link-wrapper">
            <span>Уже зарегистрированы?</span>
            <Link to="/signin" className="form__reg-login-link">
              Войти
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
