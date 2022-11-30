import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import { getMovies } from "../../utils/MoviesApi";
import {
  saveMovie,
  removeSavedMovie,
  getSavedMovies,
} from "../../utils/MainApi";

function Movies(props) {
  // переменная состояния, отвечающая за отображение прелоадера
  const [isLoading, setIsLoading] = useState(true);
  // переменная состояния, отвечающая за признак первичного поиска
  const [isFirstSearch, setIsFirstSearch] = useState(
    localStorage.getItem("isFirstSearch")
      ? JSON.parse(localStorage.getItem("isFirstSearch"))
      : true
  );
  // переменная состояния, отвечающая за стейт данных о карточках
  const [cards, setCards] = useState(
    localStorage.getItem("filteredMovies")
      ? JSON.parse(localStorage.getItem("filteredMovies"))
      : // : localStorage.getItem("moviesStorage")
        // ? JSON.parse(localStorage.getItem("moviesStorage"))
        []
  );
  // переменная состояния, хранящая список карточек с поставленными лайками
  const [likes, setLikes] = useState([]);
  // переменная состояния, отвечающая за стейт поисковой строки
  const [queryText, setQueryText] = useState(
    localStorage.getItem("queryText")
      ? JSON.parse(localStorage.getItem("queryText"))
      : ""
  );
  // переменная состояния, отвечающая за стейт чек-бокса
  // const [checkShort, setCheckShort] = useState(false);
  const [checkShort, setCheckShort] = useState(
    localStorage.getItem("checked")
      ? JSON.parse(localStorage.getItem("checked"))
      : false
  );

  // стэйт с ошибкой при запросе данных у сервера
  const [errors, setErrors] = useState("");

  // эффект при монтировании компонента (не важно перезагрузка страницы или при перемещении между роутерами)
  useEffect(() => {
    //если запроса еще не было: значит мы вошли после логина!
    if (isFirstSearch) {
      // крутим прелоадер - ждем первого поиска
      setIsLoading(true);
      // обновляем фильмы с сервера каждый раз - вдруг что-то новенькое)
      getMovies()
        // здесь уже данные от сервера пришли!
        .then((res) => {
          // console.log(res);
          if (res) {
            // сохраняем данные в локальном хранилище
            localStorage.setItem("moviesStorage", JSON.stringify(res));
            setErrors(
              "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            );
          }
        })
        .catch((err) => {
          console.log(`Ошибка при зарузке фильмов: ${err}!`);
          setErrors("");
        });
    } else {
      setIsLoading(false);
    }
    // инициализируем список id фильмов с лайками = все те, которые есть в сохраненных
    getSavedMovies()
      // обрабатываем полученные данные деструктурируем ответ от сервера, чтобы было понятнее, что пришло
      .then((cards) => {
        // карточки загружаем
        // сохраняем данные в локальном хранилище
        setLikes(
          cards.map((card) => {
            return card.movieId;
          })
        );
      })
      .catch((err) => {
        console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
      });
  }, []);

  //обработчик submit в SearchForm
  const moviesSearch = (newQueryText, newCheckShort) => {
    //обновляем стейты - пусть выполняются потихоньку...
    setIsLoading(true);
    setQueryText(newQueryText);
    setCheckShort(newCheckShort);
    localStorage.setItem("checked", JSON.stringify(newCheckShort));
    localStorage.setItem("queryText", JSON.stringify(newQueryText));
    if (isFirstSearch) {
      localStorage.setItem("isFirstSearch", JSON.stringify(false));
      setIsFirstSearch(false);
    }

    const movies = JSON.parse(localStorage.getItem("moviesStorage"));

    // если поисковая строка не пустая и не включены короткометражки
    if (newQueryText.length !== 0 && !newCheckShort) {
      //сохраняем новые значения запроса и чек-бокса в localStorage

      const searchText = newQueryText.toLowerCase();
      const filteredMovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchText);
      });
      setCards(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      setIsLoading(false);
    } else if (newQueryText.length !== 0 && newCheckShort) {
      const searchText = newQueryText.toLowerCase();
      const filteredMovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchText);
      });
      const shortFilteredMovies = filteredMovies.filter((item) => {
        return item.duration <= 40;
      });
      setCards(shortFilteredMovies);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(shortFilteredMovies)
      );
      setIsLoading(false);
    } else if (newQueryText.length === 0 && !newCheckShort) {
      //сохраняем новые значения запроса и чек-бокса в localStorage
      setCards(movies);
      localStorage.setItem("filteredMovies", JSON.stringify(movies));
      setIsLoading(false);
    } else {
      // показываем ВСЕ коротометражки
      const shortFilteredMovies = movies.filter((item) => {
        return item.duration <= 40;
      });
      setCards(shortFilteredMovies);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(shortFilteredMovies)
      );
      setIsLoading(false);
    }
  };

  //обработка лайка карточки
  const handleCardLike = (card, isLiked) => {
    if (!isLiked) {
      // если карточка не была до этого лайкнута, значит сохранеям фильм
      saveMovie(
        card.country,
        card.director,
        card.duration,
        card.year,
        card.description,
        "https://api.nomoreparties.co" + card.image.url,
        card.trailerLink,
        "https://api.nomoreparties.co" + card.image.formats.thumbnail.url,
        card.id,
        card.nameRU,
        card.nameEN
      )
        .then((newCard) => {
          console.log("Фильм успешно сохранен!");
          //добавляем id карточки в список лайкнутых
          setLikes([newCard.id, ...likes]);
        })
        .catch((err) => {
          console.log(`Ошибка при добавлении фильма: ${err}!`);
        });
    } else {
      // удаляем фильм!
      //вначале нужно получить _id этого фильма в БД сохраненных
      getSavedMovies()
        // обрабатываем полученные данные деструктурируем ответ от сервера, чтобы было понятнее, что пришло
        .then((cards) => {
          const deletedCard = cards.filter((item) => {
            return item.movieId === card.id;
          });
          removeSavedMovie(deletedCard[0]._id)
            .then((newCard) => {
              console.log("Фильм успешно удален!");
              // удаляем id карточки из списка лайкнутых
              setLikes((likes) => likes.filter((id) => id !== card.id));
            })
            .catch((err) => {
              console.log(`Ошибка при удалении фильма: ${err}!`);
            });
        })
        .catch((err) => {
          console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
        });
    }
  };

  return (
    <section className="movies">
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <SearchForm
        placeholder="Фильм"
        queryText={queryText}
        checkShort={checkShort}
        onSearch={moviesSearch}
      />
      {isLoading && <Preloader />}
      {!cards.length && (
        <span className="movies__not-found">Ничего не найдено!</span>
      )}
      {!isLoading && cards && (
        <MoviesCardList
          cards={cards}
          likes={likes}
          onCardLike={handleCardLike}
          onCardClick={props.onCardClick}
          onCardDelete={props.onCardDelete}
        />
      )}
      <Footer />
    </section>
  );
}

export default Movies;
