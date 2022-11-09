import React from "react";
import Card from "../Card/Card";
import LikeButton from "../LikeButton/LikeButton";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./MoviesCard.css";

function MoviesCard(props) {
  return (
    <Card card={props.card}>
      <LikeButton />
    </Card>
  );
}

export default MoviesCard;
