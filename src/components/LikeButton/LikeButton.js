import React from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./LikeButton.css";

function LikeButton(props) {
  const [isLiked, setIsLiked] = React.useState(false);
  // подписываемся на контекст CurrentUserContext
  // const currentUser = React.useContext(CurrentUserContext);

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked ? "elements__like-button_active" : ""
  }`;

  function handleLikeClick() {
    //props.onCardLike(props.card);
    setIsLiked(!isLiked);
  }

  console.log(props.card);

  return (
    <div>
      <button
        className={cardLikeButtonClassName}
        type="button"
        aria-label="Like button"
        onClick={handleLikeClick}
      ></button>
    </div>
  );
}

export default LikeButton;
