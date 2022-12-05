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
  const [isLoading, setIsLoading] = useState(false);
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
  // стэйт - индикатор пустого результата запроса
  const [isEmptySearch, setIsEmptySearch] = useState(false);

  // эффект при монтировании компонента (не важно перезагрузка страницы или при перемещении между роутерами)
  useEffect(() => {
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
        console.log(`Сохраненные фильмы: ${JSON.stringify(cards)}`);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе сохраненных фильмов: ${err}!`);
      });
  }, []);

  //обработчик submit в SearchForm
  async function moviesSearch(newQueryText, newCheckShort) {
    //обновляем стейты - пусть выполняются потихоньку...

    setQueryText(newQueryText);
    setCheckShort(newCheckShort);
    //сохраняем новые значения запроса и чек-бокса в localStorage
    localStorage.setItem("checked", JSON.stringify(newCheckShort));
    localStorage.setItem("queryText", JSON.stringify(newQueryText));

    // Это первый поиск фильмов? Тогда идем за фильмами:
    if (isFirstSearch) {
      //setErrors("");
      setIsLoading(true);

      await getMovies()
        // здесь уже данные от сервера пришли!
        .then((res) => {
          // console.log(res);
          if (res) {
            // сохраняем данные в локальном хранилище
            localStorage.setItem("moviesStorage", JSON.stringify(res));
            //setErrors("");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(`Ошибка при зарузке фильмов: ${err}!`);
          setErrors(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        });

      localStorage.setItem("isFirstSearch", JSON.stringify(false));
      setIsFirstSearch(false);
    }

    //сбрасываем индикатор пустого результата поиска
    setIsEmptySearch(false);
    const movies = JSON.parse(localStorage.getItem("moviesStorage"));
    //если в "moviesStorage" ничего нет, то в movies null, значит при загрузке данных ошибка
    if (movies === null) {
      setErrors(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
      return;
    }

    setErrors("");
    let searchedMovies = [];
    setIsLoading(true);
    // если поисковая строка не пустая и не включены короткометражки
    if (newQueryText.length !== 0 && !newCheckShort) {
      const searchText = newQueryText.toLowerCase();
      searchedMovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchText);
      });
    } else if (newQueryText.length !== 0 && newCheckShort) {
      const searchText = newQueryText.toLowerCase();
      const filteredMovies = movies.filter((item) => {
        return item.nameRU.toLowerCase().includes(searchText);
      });
      searchedMovies = filteredMovies.filter((item) => {
        return item.duration <= 40;
      });
    } else if (newQueryText.length === 0 && !newCheckShort) {
      searchedMovies = JSON.parse(localStorage.getItem("moviesStorage"));
    } else {
      // показываем ВСЕ коротометражки
      searchedMovies = movies.filter((item) => {
        return item.duration <= 40;
      });
    }

    //отображаем карточки, которые нашли и делаем проверку на пустую выдачу
    setIsLoading(false);
    localStorage.setItem("filteredMovies", JSON.stringify(searchedMovies));
    setCards(searchedMovies);
    if (searchedMovies.length === 0) setIsEmptySearch(true);
  }

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
      {isEmptySearch && (
        <span className="movies__not-found">Ничего не найдено!</span>
      )}
      {errors !== "" && <span className="movies__not-found">{errors}</span>}
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
