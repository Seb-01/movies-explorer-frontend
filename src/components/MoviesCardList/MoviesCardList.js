import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList(props) {
  // текущая ширина ширина экрана
  const [screenWide, setScreenWide] = useState(window.innerWidth);

  // стейты для расчеты сетки с карточками:
  const [extraRows, setExtraRows] = useState(0);
  const [countExtraRows, setCountExtraRows] = useState(0);
  const [stepRows, setStepRows] = useState(0);
  const [maxRows, setMaxRows] = useState(0);
  const [maxCols, setMaxCols] = useState(0);

  // эффект при монтировании компонента
  useEffect(() => {
    // устанавливаем слушатель изменения ширины экрана
    window.addEventListener("resize", handleResize);

    // Возвращаем функцию, которая удаляет эффекты
    // Такой возвращаемый колбэк обычно называется “cleanup” (от англ. «очистка»)
    // чтобы «подчистить» результаты эффекта когда компонент будет размонтирован
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // Если у хука не указаны зависимости, он будет вызван после каждого рендера
  }, []);

  const handleResize = (event) => {
    // Внутренний размер окна — это ширина и высота области просмотра (вьюпорта).
    console.log(window.innerWidth);
    //alert("window.innerWidth");
    setScreenWide(window.innerWidth);
    console.log(`handleResize extraRows: ${extraRows}`);
  };

  // эффект, при изменении ширины экрана или карточек для показа
  useEffect(() => {
    const { maxRows, maxCols, extraRows, stepRows } = moviesCalculate(
      screenWide,
      props.cards.length
    );
    setMaxRows(maxRows);
    setMaxCols(maxCols);
    setExtraRows(extraRows);
    setStepRows(stepRows);
    setCountExtraRows(0);

    //setMoviesStore({ ...moviesStore, maxRows, maxCols, addedRows });
  }, [screenWide, props.cards.length]);

  // делает расчет для отображения карточек
  const moviesCalculate = (screenWide, moviesAmount) => {
    let maxRows = 0;
    let maxCols = 0;
    let extraRows = 0;
    let stepRows = 0;

    // прописываем сетку в зависимости от ширины экрана
    if (screenWide >= 1280) {
      maxRows = 4;
      maxCols = 4;
      stepRows = 1;
    } else if (screenWide < 1280 && screenWide >= 1020) {
      maxRows = 4;
      maxCols = 3;
      stepRows = 1;
    } else if (screenWide < 1020 && screenWide >= 768) {
      maxRows = 4;
      maxCols = 2;
      stepRows = 1;
    } else if (screenWide < 768 && screenWide >= 480) {
      maxRows = 5;
      maxCols = 1;
      stepRows = 2;
    } else {
      maxRows = 5;
      maxCols = 1;
      stepRows = 2;
    }

    // теперь рассчитываем addedRows
    if (maxRows * maxCols - moviesAmount >= 0) {
      // сетки хватает для вывода фильмов
      return { maxRows: maxRows, maxCols: maxCols, extraRows: extraRows };
    } else {
      // вычисляем целую часть:
      extraRows = Math.floor((moviesAmount - maxRows * maxCols) / maxCols);
      // остаток от деления:
      extraRows =
        (moviesAmount - maxRows * maxCols) % maxCols > 0
          ? extraRows + 1
          : extraRows;
      console.log(`extraRows: ${extraRows}`);

      return {
        maxRows: maxRows,
        maxCols: maxCols,
        extraRows: extraRows,
        stepRows: stepRows,
      };
    }
  };

  // обработчик нажатия на кнопку
  const handleClick = (event) => {
    if (countExtraRows < extraRows)
      setCountExtraRows(countExtraRows + 1 * stepRows);
  };

  return (
    <>
      <section className="elements">
        {/* карточки отображаем */}
        {props.cards
          .slice(0, maxRows * maxCols + countExtraRows * maxCols)
          .map((item, i) => (
            <MoviesCard
              key={item.id}
              card={item}
              isLiked={props.likes.includes(item.id) ? true : false}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
      </section>
      <div className="movies-card-list__another-one-button-wrapper">
        <button
          className={`movies-card-list__another-one-button ${
            extraRows - countExtraRows
              ? ""
              : "movies-card-list__another-one-button_disabled"
          }`}
          onClick={handleClick}
        >
          Еще
        </button>
      </div>
    </>
  );
}

export default MoviesCardList;
