import "./Navigation.css";
import { NavLink } from "react-router-dom";
import buttonMenuPic from "../../images/button_menu_pic.svg";
import buttonMenuBlackPic from "../../images/button_menu_black_pic.svg";

function Navigation(props) {
  //const setActive = ({ isActive }) =>(isActive ? "navigation__link navigation__link_active" : "navigation__link");

  return (
    <section
      className={
        props.auth === "true" ? "navigation navigation_auth" : "navigation"
      }
    >
      <NavLink
        to="/movies"
        className={
          props.auth === "true"
            ? "navigation__link navigation__link_auth"
            : "navigation__link"
        }
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={
          props.auth === "true"
            ? "navigation__link navigation__link_auth"
            : "navigation__link"
        }
      >
        Сохраненные фильмы
      </NavLink>
      <button
        className="navigation__button"
        onClick={props.updateIsOpenPopupMenu}
      >
        <img
          src={props.isBlack === "true" ? buttonMenuBlackPic : buttonMenuPic}
          alt="Изображение кнопки меню"
        />
      </button>
    </section>
  );
}

export default Navigation;
