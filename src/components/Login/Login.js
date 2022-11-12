import React from "react";
import Logo from "../Logo/Logo";
import "./Login.css";
import logoRegister from "../../images/logo_header.svg";
import { Link } from "react-router-dom";

function Login(props) {
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
              E-mail
              <input
                id="login-email-input"
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
                id="login-password-input"
                type="password"
                className="form__input"
                value={props.password}
                name="password"
                placeholder="Пароль"
                minlenght="2"
                maxlenght="200"
                required
                onChange={props.onChange}
              />
            </label>
          </fieldset>

          <button className="form__login-submit-button" type="submit">
            {props.buttonSubmitText}
          </button>
          <div className="form__reg-login-link-wrapper">
            <span>Еще не зарегистрированы?</span>
            <Link to="/signup" className="form__reg-login-link">
              Регистрация
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
