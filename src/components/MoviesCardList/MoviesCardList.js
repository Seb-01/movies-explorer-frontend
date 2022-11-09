import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  return (
    <section className="elements">
      {/* карточки отображаем */}
      {props.cards.map((item, i) => (
        <MoviesCard
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

export default MoviesCardList;
