import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <section className="form__container">
        <form name={props.name} onSubmit={props.onSubmit}>
          <h2 className="form__profile-title">Привет, {props.title}!</h2>

          <fieldset className="form__info">
            <label className="form__profile-field">
              E-mail
              <input
                id="profile-email-input"
                type="email"
                className="form__profile-input"
                value={props.email}
                name="email"
                placeholder="email"
                minlenght="2"
                maxlenght="200"
                required
                onChange={props.onChange}
              />
            </label>
            <label className="form__profile-field">
              Пароль
              <input
                id="profile-password-input"
                type="password"
                className="form__profile-input"
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

          <button className="form__profile-submit-button" type="submit">
            {props.buttonSubmitText}
          </button>
          <div className="form__profile-action-wrapper">
            <Link to="/signin" className="form__logout-link">
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
