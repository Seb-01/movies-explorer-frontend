import React from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Card.css";

function Card(props) {
  // кликом по карточке переводим на ютюб-трейлер фильма
  const handleCardClick = (event) => {
    props.onCardClick(props.trailerLink);
  };

  return (
    <article className="elements__card">
      <img
        className="elements__photo"
        src={props.image}
        alt={props.nameRU}
        // не забываем добавить обработчик клика на карточке
        onClick={handleCardClick}
      />
      <div className="elements__wrapper">
        <h2 className="elements__title">{props.nameRU}</h2>
        {/* тут будет вложенное содержимое в виде JSX-разметки */}
        {props.children}
      </div>
      <span className="elements__subtitle">{props.duration}</span>
    </article>
  );
}

export default Card;
