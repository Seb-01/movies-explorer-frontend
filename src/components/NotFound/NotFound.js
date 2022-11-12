import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <>
      <section className="notfound__container">
        <h2 className="notfound__title">404</h2>
        <h3 className="notfound__subtitle">Страница не найдена</h3>
        <Link to="/" className="notfound__link">
          Назад
        </Link>
      </section>
    </>
  );
}

export default NotFound;
