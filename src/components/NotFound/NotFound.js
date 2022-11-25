import React from "react";
import "./NotFound.css";
import { useHistory } from "react-router-dom";

function NotFound(props) {
  const history = useHistory();
  return (
    <>
      <section className="notfound__container">
        <h2 className="notfound__title">404</h2>
        <h3 className="notfound__subtitle">Страница не найдена</h3>
        <button className="notfound__button" onClick={() => history.goBack()}>
          Назад
        </button>
      </section>
    </>
  );
}

export default NotFound;
