import React from "react";
import Card from "../Card/Card";
import TrashButton from "../TrashButton/TrashButton";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedMoviesCard.css";

function SavedMoviesCard(props) {
  return (
    <Card
      card={props.card}
      image={props.card.image}
      nameRU={props.card.nameRU}
      duration={props.card.duration}
      trailerLink={props.card.trailerLink}
      onCardClick={props.onCardClick}
    >
      <TrashButton card={props.card} onCardDelete={props.onCardDelete} />
    </Card>
  );
}

export default SavedMoviesCard;
