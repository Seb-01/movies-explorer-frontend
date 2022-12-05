import React, { useState, useEffect } from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Preloader from "../Preloader/Preloader";
import { getSavedMovies, removeSavedMovie } from "../../utils/MainApi";
import Footer from "../Footer/Footer";

function SavedMovies(props) {
  // переменная состояния, отвечающая за стейт данных о карточках
  const [cardsSaved, setCardsSaved] = useState([]);
  // переменная состояния, отвечающая за отображение прелоадера
  const [isLoading, setIsLoading] = useState(false);
  // переменная состояния, отвечающая за стейт поисковой строки
  const [queryText, setQueryText] = useState("");

  // const [queryText, setQueryText] = useState(
  //   localStorage.getItem("queryTextSaved")
  //     ? JSON.parse(localStorage.getItem("queryTextSaved"))
  //     : ""
  // );

  // переменная состояния, отвечающая за стейт чек-бокса
  const [checkShort, setCheckShort] = useState(false);

  // const [checkShort, setCheckShort] = useState(
  //   localStorage.getItem("queryTextSaved")
  //     ? JSON.parse(localStorage.getItem("checkedSaved"))
  //     : false
  // );

  // добавляем эффект, вызываемый при монтировании компонента, который будет совершать
  // запрос в API за сохраненными фильмами
  useEffect(() => {
    setIsLoading(true);

    getSavedMovies()
      // обрабатываем полученные данные деструктурируем ответ от сервера, чтобы было понятнее, что пришло
      .then((cards) => {
        // карточки загружаем
        //setCardsSaved(cards);

        let showedCards = cards;
        // if (localStorage.getItem("queryTextSaved")) {
        //   let searchText = JSON.parse(localStorage.getItem("queryTextSaved"));
        //   setQueryText(searchText);
        //   if (searchText !== "") {
        //     searchText = searchText.toLowerCase();
        //     showedCards = showedCards.filter((item) => {
        //       return item.nameRU.toLowerCase().includes(searchText);
        //     });
        //   }
        // }
        // if (localStorage.getItem("checkedSaved")) {
        //   const checkValue = JSON.parse(localStorage.getItem("checkedSaved"));
        //   setCheckShort(checkValue);
        //   if (checkValue) {
        //     showedCards = showedCards.filter((item) => {
        //       return item.duration <= 40;
        //     });
        //   }
        // }
        setCardsSaved(showedCards);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
      });
  }, []);

  //
  //обработка удаления карточки
  const handleTrashButton = (card) => {
    // удаляем фильм!
    removeSavedMovie(card._id)
      .then((newCard) => {
        console.log("Фильм успешно удален!");
        setCardsSaved((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка при удалении фильма: ${err}!`);
      });
  };

  // обработчик submit в SearchForm
  const moviesSearch = (newQueryText, newCheckShort) => {
    //обновляем стейты
    if (newQueryText !== queryText || newCheckShort !== checkShort) {
      setIsLoading(true);
      setQueryText(newQueryText);
      setCheckShort(newCheckShort);
    }
  };

  // эффект, который формирует массив карточкек в соответствии с queryText и checked
  useEffect(() => {
    setIsLoading(true);

    // localStorage.setItem("checkedSaved", JSON.stringify(checkShort));
    // localStorage.setItem("queryTextSaved", JSON.stringify(queryText));

    //снова загружаем все карточки
    getSavedMovies()
      // обрабатываем полученные данные деструктурируем ответ от сервера, чтобы было понятнее, что пришло
      .then((cards) => {
        // карточки загружаем
        // если поисковая строка не пустая и не включены короткометражки
        if (queryText.length !== 0 && !checkShort) {
          const searchText = queryText.toLowerCase();
          const filteredMovies = cards.filter((item) => {
            return item.nameRU.toLowerCase().includes(searchText);
          });
          setCardsSaved(filteredMovies);
          setIsLoading(false);
        } else if (queryText.length !== 0 && checkShort) {
          const searchText = queryText.toLowerCase();
          const filteredMovies = cards.filter((item) => {
            return item.nameRU.toLowerCase().includes(searchText);
          });
          const shortFilteredMovies = filteredMovies.filter((item) => {
            return item.duration <= 40;
          });
          setCardsSaved(shortFilteredMovies);
          setIsLoading(false);
        } else if (queryText === "" && !checkShort) {
          setCardsSaved(cards);
          setIsLoading(false);
        } else {
          // показываем ВСЕ коротометражки
          const shortFilteredMovies = cards.filter((item) => {
            return item.duration <= 40;
          });
          setCardsSaved(shortFilteredMovies);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
      });
  }, [queryText, checkShort]);

  return (
    <section className="movies">
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <SearchForm
        placeholder="Фильм"
        onSearch={moviesSearch}
        queryText={queryText}
        checkShort={checkShort}
      />
      {/* <Preloader /> */}
      {isLoading && <Preloader />}
      {!isLoading && (
        <SavedMoviesCardList
          cardsSaved={cardsSaved}
          onCardDelete={handleTrashButton}
          onCardClick={props.onCardClick}
        />
      )}
      {/* <div className="movies__another-one-button-wrapper">
        <button className="movies__another-one-button">Еще</button>
      </div> */}
      <Footer />
    </section>
  );
}

export default SavedMovies;
