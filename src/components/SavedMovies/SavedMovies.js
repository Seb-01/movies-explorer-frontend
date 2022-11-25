import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Preloader from "../Preloader/Preloader";
import { getSavedMovies, removeSavedMovie } from "../../utils/MainApi";

function SavedMovies(props) {
  // переменная состояния, отвечающая за стейт данных о карточках
  const [cards, setCards] = useState([]);

  // добавляем эффект, вызываемый при монтировании компонента, который будет совершать
  // запрос в API за сохраненными фильмами
  useEffect(() => {
    getSavedMovies()
      // обрабатываем полученные данные деструктурируем ответ от сервера, чтобы было понятнее, что пришло
      .then((cards) => {
        // карточки загружаем
        console.log(cards);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
      });
  }, []);

  //
  //обработка лайка карточки
  const handleTrashButton = (card) => {
    // удаляем фильм!
    removeSavedMovie(card._id)
      .then((newCard) => {
        console.log("Фильм успешно удален!");
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении фильма: ${err}!`);
      });
  };

  return (
    <section className="movies">
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <SearchForm placeholder="Фильм" />
      {/* <Preloader /> */}
      <SavedMoviesCardList
        cards={cards}
        onCardDelete={handleTrashButton}
        onCardClick={props.onCardClick}
      />
      {/* <div className="movies__another-one-button-wrapper">
        <button className="movies__another-one-button">Еще</button>
      </div> */}
    </section>
  );
}

export default SavedMovies;
