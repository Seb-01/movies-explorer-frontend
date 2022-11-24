import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import logoRegister from "../../images/logo_header.svg";
import { Link } from "react-router-dom";

function Login(props) {
  // управляемые элементы полей input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // состояния с ошибками
  const [emailError, setEmailError] = useState("start");
  const [passwordError, setPasswordError] = useState("start");

  // состояние валидности формы
  const [isValid, setIsValid] = useState(false);

  // делаем ссылочку на input email - браузерную валидиацию из поля будем брать!
  const emailInputRef = useRef();

  // Обрабочик ввода инфо в поле email
  const handleEmail = (event) => {
    const target = event.target;
    const value = target.value;
    setEmail(value);

    // и здесь же валидацию реализуем - берем ее из Constraint Validation API
    if (emailInputRef.current.validationMessage) {
      setEmailError(`${"Email: "} ${emailInputRef.current.validationMessage}`);
    } else {
      setEmailError("");
    }
  };

  // обработчик изменения в поле password
  const handlePassword = (event) => {
    const target = event.target;
    const value = target.value;
    setPassword(value);
    // валидируем поле самостоятельно
    if (!value) {
      setPasswordError("Поле Пароля не должно быть пустым!");
      return;
    }
    if (
      value.length < props.minLengthPassword ||
      value.length > props.maxLengthPassword
    ) {
      setPasswordError(
        `Пароль должен быть больше ${props.minLengthPassword} и меньше ${props.maxLengthPassword} символов!`
      );
      return;
    }

    const re = /^[a-zA-Z0-9!#$%&?]+$/gi;
    const res = re.test(String(value).toLowerCase());

    if (!res) {
      setPasswordError(
        "Пароль должен включать латиницу, цифры и спецсимволы !#$%&?"
      );
    } else {
      setPasswordError("");
    }
  };

  // хук для валидации формы в целом!
  useEffect(() => {
    if (emailError || passwordError) {
      setIsValid(false);
    } else {
      if (emailError === "start" || passwordError === "start") {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [emailError, passwordError]);

  // отправка запроса
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onLogin(email, password);
  };

  return (
    <>
      <section className="form__reg-login-container">
        <form name={props.name} action="#" onSubmit={handleSubmit} noValidate>
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
                ref={emailInputRef}
                placeholder="email"
                required
                onChange={handleEmail}
              />
            </label>
            <label className="form__field">
              Пароль
              <input
                id="register-password-input"
                type="password"
                className="form__input form__input_text-color-red"
                value={password}
                name="password"
                placeholder="Пароль"
                minLength={props.minLengthPassword}
                maxLength={props.maxLengthPassword}
                required
                onChange={handlePassword}
              />
              <span className="form__input-error">
                {`${emailError !== "start" ? emailError : ""} ${
                  passwordError !== "start" ? passwordError : ""
                }`}
              </span>
            </label>
          </fieldset>

          <button
            className={`form__reg-login-submit-button ${
              isValid ? "" : "form__reg-login-submit-button_disabled"
            }`}
            type="submit"
          >
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
