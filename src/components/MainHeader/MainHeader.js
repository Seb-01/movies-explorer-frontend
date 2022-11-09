import React from "react";
import "./MainHeader.css";
import Logo from "../Logo/Logo";
import logoHeader from "../../images/logo_header.svg";
import { Link } from "react-router-dom";

function MainHeader(props) {
  return (
    <header className="main-header">
      <Logo logo={logoHeader} />
      <div className="main-header__links">
        <Link to="signup" className="main-header__link">
          Регистрация
        </Link>
        <Link
          to="signin"
          className="main-header__link main-header__link_style-green"
        >
          Войти
        </Link>
      </div>
    </header>
  );
}

export default MainHeader;
