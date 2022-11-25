import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { moviesDataBase } from "../../utils/utils.js";
import Footer from "../Footer/Footer";
import { getMovies } from "../../utils/MoviesApi";
import {
  saveMovie,
  removeSavedMovie,
  getSavedMovies,
} from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Movies(props) {
  // переменная состояния, отвечающая за отображение прелоадера
  const [isLoading, setIsLoading] = useState(false);
  // переменная состояния, отвечающая за стейт данных о карточках
  const [cards, setCards] = useState([]);
  // переменная состояния, хранящая список карточек с поставленными лайками
  const [likes, setLikes] = useState([]);
  // переменная состояния, отвечающая за стейт поисковой строки
  const [queryText, setQueryText] = useState("");
  // переменная состояния, отвечающая за стейт чек-бокса
  const [checkShort, setCheckShort] = useState(false);

  // эффект при монтировании компонента
  useEffect(() => {
    //здесь просто выгружаем сохраненное состояние на момент размонтирования компонента!
    // обновляем фильмы с сервера каждый раз - вдруг что-то новенькое)
    getMovies()
      // здесь уже данные от сервера пришли!
      .then((res) => {
        // console.log(res);
        if (res) {
          // сохраняем данные в локальном хранилище
          localStorage.setItem("moviesStorage", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(`Ошибка при зарузке фильмов: ${err}!`);
      });

    // инициализируем список id фильмов с лайками = все те, которые есть в сохраненных
    getSavedMovies()
      // обрабатываем полученные данные деструктурируем ответ от сервера, чтобы было понятнее, что пришло
      .then((cards) => {
        // карточки загружаем
        setLikes(
          cards.map((card) => {
            return card.movieId;
          })
        );
      })
      .catch((err) => {
        console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
      });

    //проверяем сохраненные ранее отфильтрованные фильмы и если есть восстанавливаем стейты!
    if (localStorage.getItem("filteredMovies")) {
      setIsLoading(true);
      const recentMovies = JSON.parse(localStorage.getItem("filteredMovies"));
      const recentQueryText = JSON.parse(localStorage.getItem("queryText"));
      const recentcheckShort = JSON.parse(localStorage.getItem("checked"));
      setCards(recentMovies);
      setQueryText(recentQueryText);
      setCheckShort(recentcheckShort);
      setIsLoading(false);
    }

    //здесь также возвращаем функцию, которая "подметет" все при демонтаже
    //нужно будет сложить в localStorage отфильтрованные фильмы, поисковый запрос и положение чек-бокса
  }, []);

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
    // если поисковая строка не пустая и не включены короткометражки
    if (queryText.length !== 0 && !checkShort) {
      //сохраняем новые значения запроса и чек-бокса в localStorage
      localStorage.setItem("checked", JSON.stringify(checkShort));
      localStorage.setItem("queryText", JSON.stringify(queryText));

      console.log(queryText);
      console.log(checkShort);

      const movies = JSON.parse(localStorage.getItem("moviesStorage"));
      console.log(movies);

      const searchText = queryText.toLowerCase();
      console.log(searchText);
      const filteredMovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchText);
      });
      console.log(searchText);

      setCards(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      setIsLoading(false);
    } else {
      if (queryText.length !== 0 && checkShort) {
        localStorage.setItem("checked", JSON.stringify(checkShort));
        localStorage.setItem("queryText", JSON.stringify(queryText));

        const movies = JSON.parse(localStorage.getItem("moviesStorage"));
        const searchText = queryText.toLowerCase();
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
      }
    }
  }, [queryText, checkShort]);

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
      removeSavedMovie(card.id)
        .then((newCard) => {
          console.log("Фильм успешно удален!");
          // удаляем id карточки из списка лайкнутых
          setLikes((likes) => likes.filter((id) => id !== card.id));
        })
        .catch((err) => {
          console.log(`Ошибка при удалении фильма: ${err}!`);
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
      {!isLoading && (
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
