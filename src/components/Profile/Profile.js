import React, { useEffect, useRef, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  const [readyToEdit, setReadyToEdit] = useState(false);
  const [formMessage, setFormMessage] = useState(props.resultUpdateProfile);
  console.log(formMessage);

  // управляемые элементы полей input
  const [userName, setUserName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  // делаем ссылочку на input email - браузерную валидиацию из поля будем брать!
  const emailInputRef = useRef();

  // состояния с ошибками
  // const [nameError, setNameError] = useState("Поле Имя не должно быть пустым!");
  const [nameError, setNameError] = useState("start");
  const [emailError, setEmailError] = useState("start");

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  // const submitButtonClassName = `form__profile-submit-button ${
  //   userName === currentUser.name && email === currentUser.email
  //     ? "form__profile-submit-button_disable"
  //     : ""
  // }`;

  // Обрабочик ввода инфо в поле email
  const handleEmail = (event) => {
    const target = event.target;
    const value = target.value;
    setEmail(value);

    // валидацию на основе regexp
    const re =
      /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/gi;
    const res = re.test(String(value).toLowerCase());
    if (!res) {
      setEmailError("Неверный формат email!");
    } else {
      setEmailError("");
    }
  };

  // обработчик изменения в поле имя
  const handleName = (event) => {
    const target = event.target;
    const value = target.value;

    setUserName(value);
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

  // отправка запроса
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    props.onUpdateUserProfile(userName, email);
  };

  // отправка запроса
  const handleExitAccount = (event) => {
    event.preventDefault();
    // console.log(event);
    props.onLogout();
  };

  useEffect(() => {
    if (userName === currentUser.name && email === currentUser.email)
      setReadyToEdit(false);
    else {
      setReadyToEdit(true);
      setFormMessage("");
    }
  }, [userName, email, currentUser.name, currentUser.email]);

  return (
    <>
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <section className="form__profile-container">
        <form name={props.name} action="#" onSubmit={handleSubmit} noValidate>
          <h2 className="form__profile-title">Привет, {currentUser.name}!</h2>
          <fieldset className="form__info">
            <label className="form__profile-field">
              Имя
              <input
                id="profile-name-input"
                type="text"
                className="form__profile-input"
                value={userName}
                name="name"
                placeholder=""
                minLength={props.minLengthName}
                maxLength={props.maxLengthName}
                required
                onChange={handleName}
              />
            </label>
            <label className="form__profile-field">
              E-mail
              <input
                id="profile-email-input"
                type="email"
                className="form__profile-input"
                value={email}
                name="email"
                ref={emailInputRef}
                placeholder=""
                required
                onChange={handleEmail}
              />
            </label>
            <span className="form__input-error">
              {`${nameError !== "start" ? nameError : ""} ${
                emailError !== "start" ? emailError : ""
              } `}
            </span>
          </fieldset>

          <span className="form__reg-login-error">
            {!readyToEdit && props.resultUpdateProfile}
            {/* {!readyToEdit && formMessage} */}
          </span>

          {/* <button className={submitButtonClassName} type="submit">
            {props.buttonSubmitText}
          </button> */}

          <button
            className={
              readyToEdit
                ? "form__profile-submit-button"
                : "form__profile-submit-button form__profile-submit-button_disable"
            }
            type="submit"
          >
            {props.buttonSubmitText}
          </button>
          <button
            className="form__profile-exit-account-button"
            type="button"
            onClick={handleExitAccount}
          >
            Выйти из аккаунта
          </button>
        </form>
      </section>
    </>
  );
}

export default Profile;
