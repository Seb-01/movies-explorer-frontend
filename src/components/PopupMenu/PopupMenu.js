import "./PopupMenu.css";
import { Link, NavLink } from "react-router-dom";
import PopupWithoutForm from "../PopupWithoutForm/PopupWithoutForm";
import profileIcon from "../../images/profile_icon.svg";

function PopupMenu(props) {
  return (
    <PopupWithoutForm isOpen={props.isOpen} onClose={props.onClose}>
      <ul className="popup-menu__link-list">
        <li className="popup-menu__link-item">
          <NavLink
            activeClassName="popup-menu__link_active"
            className="popup-menu__link"
            exact
            to="/"
            onClick={props.updateIsOpenPopupMenu}
          >
            Главная
          </NavLink>
        </li>
        <li className="popup-menu__link-item">
          <NavLink
            activeClassName="popup-menu__link_active"
            className="popup-menu__link"
            to="/movies"
            onClick={props.updateIsOpenPopupMenu}
          >
            Фильмы
          </NavLink>
        </li>
        <li className="popup-menu__link-item">
          <NavLink
            activeClassName="popup-menu__link_active"
            className="popup-menu__link"
            to="/saved-movies"
            onClick={props.updateIsOpenPopupMenu}
          >
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <section className="popup-menu__profile-link-wrapper">
        <Link
          to="/profile"
          className="popup-menu__profile__link"
          onClick={props.updateIsOpenPopupMenu}
        >
          Аккаунт
        </Link>
        <div className="popup-menu__profile-icon">
          <img src={profileIcon} alt="Иконка Профиль пользователя" />
        </div>
      </section>
    </PopupWithoutForm>
  );
}

export default PopupMenu;
