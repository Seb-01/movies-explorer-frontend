import React from "react";
import Card from "../Card/Card";
import LikeButton from "../LikeButton/LikeButton";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./MoviesCard.css";

function MoviesCard(props) {
  return (
    <Card
      image={"https://api.nomoreparties.co/" + props.card.image.url}
      nameRU={props.card.nameRU}
      duration={props.card.duration}
      trailerLink={props.card.trailerLink}
      onCardClick={props.onCardClick}
    >
      <LikeButton
        card={props.card}
        isLiked={props.isLiked}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />
    </Card>
  );
}

export default MoviesCard;
