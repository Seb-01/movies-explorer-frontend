import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function MoviesCardList(props) {
  // подписываемся на контекст CurrentUserContext
  const { screenWide } = React.useContext(CurrentUserContext);

  // стейт, который сохраняет состояние оснастки для отображения фильмов
  const [moviesStore, setMoviesStore] = useState({
    amountMovies: 0,
    currentAddedRow: 0,
    grid: { maxRows: 0, maxCols: 0, addedRows: 0 },
  });

  // делает расчет для отображения карточек
  const moviesCalculate = (screenWide, moviesAmount) => {
    let maxRows = 0;
    let maxCols = 0;
    let addedRows = 0;

    // прописываем сетку в зависимости от ширины экрана
    if (screenWide >= 1280) {
      maxRows = 4;
      maxCols = 4;
    } else if (screenWide.screenWide < 1280 && screenWide.screenWide >= 1020) {
      maxRows = 4;
      maxCols = 3;
    } else if (screenWide.screenWide < 1020 && screenWide.screenWide >= 768) {
      maxRows = 4;
      maxCols = 2;
    } else if (screenWide.screenWide < 768 && screenWide.screenWide >= 480) {
      maxRows = 5;
      maxCols = 1;
    } else {
      maxRows = 4;
      maxCols = 1;
    }

    // теперь рассчитываем addedRows
    if (maxRows * maxCols - moviesAmount >= 0) {
      // сетки хватает для вывода фильмов
      return { maxRows, maxCols, addedRows };
    } else {
      // вычисляем целую часть:
      addedRows = Math.floor((moviesAmount - maxRows * maxCols) / maxCols);
      // остаток от деления:
      addedRows =
        (moviesAmount - maxRows * maxCols) % maxCols > 0
          ? addedRows + 1
          : addedRows;

      return { maxRows: maxRows, maxCols: maxCols, addedRows: addedRows };
    }
  };

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
