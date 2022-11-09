import "./SavedMoviesCardList.css";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";

function SavedMoviesCardList(props) {
  return (
    <section className="elements">
      {/* карточки отображаем */}
      {props.cards.map((item, i) => (
        <SavedMoviesCard
          key={i}
          card={item}
          onCardClick={props.onCardClick}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
        />
      ))}
    </section>
  );
}

export default SavedMoviesCardList;
