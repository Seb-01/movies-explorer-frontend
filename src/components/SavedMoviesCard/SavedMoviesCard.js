import React from "react";
import Card from "../Card/Card";
import TrashButton from "../TrashButton/TrashButton";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SavedMoviesCard.css";

function SavedMoviesCard(props) {
  return (
    <Card card={props.card}>
      <TrashButton />
    </Card>
  );
}

export default SavedMoviesCard;
