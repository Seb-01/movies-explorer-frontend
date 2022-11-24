import React, { useEffect, useRef, useState } from "react";
import "./Register.css";
import logoRegister from "../../images/logo_header.svg";
import { Link } from "react-router-dom";

function Register(props) {
  // управляемые элементы полей input
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // состояние - были мы же в этом input или нет
  // const [userNameVisited, setUserNamevisited] = useState(false);
  // const [emailVisited, setEmailVisited] = useState(false);
  // const [passwordVisited, setPasswordVisited] = useState(false);

  // состояния с ошибками
  //const [nameError, setNameError] = useState("Поле Имя не должно быть пустым!");
  const [nameError, setNameError] = useState("start");
  // const [emailError, setEmailError] = useState(
  //   "Поле E-mail не должно быть пустым!"
  // );
  const [emailError, setEmailError] = useState("start");
  // const [passwordError, setPasswordError] = useState(
  //   "Поле пароль не должно быть пустым!"
  // );
  const [passwordError, setPasswordError] = useState("start");

  // состояние валидности формы
  const [isValid, setIsValid] = useState(false);

  // делаем ссылочку на input email - браузерную валидиацию из поля будем брать!
  const emailInputRef = useRef();

  // реакция на event, когда пользователь покинул input
  // const handleBlur = (event) => {
  //   switch (event.target.name) {
  //     case "name":
  //       setUserNamevisited(true);
  //       break;
  //     case "email":
  //       setEmailVisited(true);
  //       break;
  //     case "password":
  //       setPasswordVisited(true);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // Обрабочик ввода инфо в поле email
  const handleEmail = (event) => {
    const target = event.target;
    const value = target.value;
    setEmail(value);
    // console.log("Email: " + value);

    // и здесь же валидацию реализуем - берем ее из Constraint Validation API
    if (emailInputRef.current.validationMessage) {
      setEmailError(`${"Email: "} ${emailInputRef.current.validationMessage}`);
    } else {
      setEmailError("");
    }
  };

  // обработчик изменения в поле имя
  const handleName = (event) => {
    const target = event.target;
    const value = target.value;
    setUserName(value);
    //console.log("Имя: " + value);

    // валидируем поле самостоятельно
    if (!value) {
      setNameError("Поле Имя не должно быть пустым!");
      return;
    }
    if (
      value.length < props.minLengthName ||
      value.length > props.maxLengthName
    ) {
      setNameError(
        `Имя должно быть больше ${props.minLengthName} и меньше ${props.maxLengthName} символов!`
      );
      return;
    }
    // поле name содержит только латиницу, кириллицу, пробел или дефис
    const re = /^[а-яёА-ЯЁA-Za-z -]+$/gi;
    const res = re.test(String(value).toLowerCase());
    // console.log("Регулярка " + res);
    if (!res) {
      setNameError(
        "Поле Имя должно содержать только латиницу, кириллицу, пробел или дефис!"
      );
    } else {
      setNameError("");
    }
  };

  // обработчик изменения в поле password
  const handlePassword = (event) => {
    const target = event.target;
    const value = target.value;
    // console.log("Пароль: " + value);
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
    // console.log("Регулярка " + res);

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
    if (nameError || emailError || passwordError) {
      setIsValid(false);
    } else {
      if (
        nameError === "start" ||
        emailError === "start" ||
        passwordError === "start"
      ) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [nameError, emailError, passwordError]);

  // отправка запроса
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    props.onRegister(email, password, userName);
  };

  return (
    <section className="form__reg-login-container">
      <form name={props.name} action="#" onSubmit={handleSubmit} noValidate>
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
              value={userName}
              name="name"
              placeholder="Введите Ваше имя"
              minLength={props.minLengthName}
              maxLength={props.maxLengthName}
              required
              onChange={handleName}
              //onBlur={handleBlur}
            />
          </label>
          <label className="form__field">
            E-mail
            <input
              id="register-email-input"
              type="email"
              className="form__input"
              value={email}
              name="email"
              ref={emailInputRef}
              placeholder="email"
              required
              onChange={handleEmail}
              //onBlur={handleBlur}
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
              //onBlur={handleBlur}
            />
            <span className="form__input-error">
              {`${nameError !== "start" ? nameError : ""} ${
                emailError !== "start" ? emailError : ""
              } ${passwordError !== "start" ? passwordError : ""}`}
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
          <span>Уже зарегистрированы?</span>
          <Link to="/signin" className="form__reg-login-link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
