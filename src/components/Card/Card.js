import React from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Card.css";

function Card(props) {
  return (
    <article className="elements__card">
      <img
        className="elements__photo"
        src={props.card.image}
        alt={props.card.nameRU}
        // не забываем добавить обработчик клика на карточке
        onClick={props.handleClick}
      />
      <div className="elements__wrapper">
        <h2 className="elements__title">{props.card.nameRU}</h2>
        {/* тут будет вложенное содержимое в виде JSX-разметки */}
        {props.children}
      </div>
      <span className="elements__subtitle">{props.card.duration}</span>
    </article>
  );
}

export default Card;
