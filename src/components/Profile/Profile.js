import React, { useRef, useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile(props) {
  // подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  //console.log(currentUser);

  // управляемые элементы полей input
  const [userName, setUserName] = useState(currentUser.currentUser.name);
  const [email, setEmail] = useState(currentUser.currentUser.email);

  // делаем ссылочку на input email - браузерную валидиацию из поля будем брать!
  const emailInputRef = useRef();

  // состояния с ошибками
  // const [nameError, setNameError] = useState("Поле Имя не должно быть пустым!");
  const [nameError, setNameError] = useState("start");
  const [emailError, setEmailError] = useState("start");

  // Обрабочик ввода инфо в поле email
  const handleEmail = (event) => {
    const target = event.target;
    const value = target.value;
    setEmail(value);
    // currentUser.email = value;
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
    // currentUser.name = value;
    setUserName(value);
    // console.log("Имя: " + value);

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

  return (
    <>
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <section className="form__profile-container">
        <form name={props.name} action="#" onSubmit={handleSubmit} noValidate>
          <h2 className="form__profile-title">
            Привет, {currentUser.currentUser.name}!
          </h2>

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
          <button className="form__profile-submit-button" type="submit">
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
