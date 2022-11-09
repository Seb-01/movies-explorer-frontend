import "./Navigation.css";
import { Link } from "react-router-dom";
import buttonMenuPic from "../../images/button_menu_pic.svg";
import buttonMenuBlackPic from "../../images/button_menu_black_pic.svg";

function Navigation(props) {
  return (
    <div
      className={
        props.auth === "true" ? "navigation navigation_auth" : "navigation"
      }
    >
      <Link
        to="/movies"
        className={
          props.auth === "true"
            ? "navigation__link navigation__link_auth"
            : "navigation__link"
        }
      >
        Фильмы
      </Link>
      <Link
        to="/saved-movies"
        className={
          props.auth === "true"
            ? "navigation__link navigation__link_auth"
            : "navigation__link"
        }
      >
        Сохраненные фильмы
      </Link>
      <button
        className="navigation__button"
        onClick={props.updateIsOpenPopupMenu}
      >
        <img
          src={props.isBlack === "true" ? buttonMenuBlackPic : buttonMenuPic}
          alt="Изображение кнопки меню"
        />
      </button>
    </div>
  );
}

export default Navigation;
