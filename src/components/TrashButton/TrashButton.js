import React from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./TrashButton.css";

function TrashButton(props) {
  const [isLiked, setIsLiked] = React.useState(false);
  // подписываемся на контекст CurrentUserContext
  // const currentUser = React.useContext(CurrentUserContext);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  console.log(props.card);

  return (
    <div>
      <button
        className="elements__trash-button"
        type="button"
        aria-label="Trash button"
        onClick={props.handleLikeClick}
      ></button>
    </div>
  );
}

export default TrashButton;
