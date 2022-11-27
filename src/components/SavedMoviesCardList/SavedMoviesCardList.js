import "./SavedMoviesCardList.css";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";

function SavedMoviesCardList(props) {
  return (
    <section className="elements">
      {/* карточки отображаем */}
      {props.cardsSaved.map((item, i) => (
        <SavedMoviesCard
          key={i}
          card={item}
          onCardClick={props.onCardClick}
          onCardDelete={props.onCardDelete}
          onSearch={props.onSearch}
        />
      ))}
    </section>
  );
}

export default SavedMoviesCardList;
