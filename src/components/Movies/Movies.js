import React, { useEffect, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { moviesDataBase } from "../../utils/utils.js";
import Footer from "../Footer/Footer";
import { getMovies } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Movies(props) {
  // переменная состояния, отвечающая за отображение прелоадера
  const [isLoading, setIsLoading] = useState(false);

  // переменная состояния, отвечающая за стейт данных о карточках
  const [cards, setCards] = useState([]);

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
        console.log(res);
        if (res) {
          // сохраняем данные в локальном хранилище
          localStorage.setItem("moviesStorage", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(`Ошибка при зарузке фильмов: ${err}!`);
      });

    //проверяем сохраненные ранее отфильтрованные фильмы и если есть восстанавливаем стейты!
    if (localStorage.getItem("filteredMovies")) {
      setIsLoading(true);
      const recentMovies = JSON.parse(localStorage.getItem("filteredMovies"));
      const recentQueryText = JSON.parse(localStorage.getItem("queryText"));
      console.log(`useEffect[]: queryText - ${recentQueryText}`);
      const recentcheckShort = JSON.parse(localStorage.getItem("checked"));
      console.log(`useEffect[]: checked - ${recentcheckShort}`);
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
    if (newQueryText !== queryText || newCheckShort !== checkShort)
      setIsLoading(true);
    setQueryText(newQueryText);
    setCheckShort(newCheckShort);
    alert(`moviesSearch: ${checkShort} и ${queryText}!`);
  };

  // эффект, который формирует массив карточкек в соответствии с queryText и checked
  useEffect(() => {
    // если поисковая строка не пустая и не включены короткометражки
    if (queryText.length !== 0 && !checkShort) {
      alert(`useEffect: изменились queryText и checkShort`);
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
        alert(`useEffect: изменились queryText и checkShort`);
        localStorage.setItem("checked", JSON.stringify(checkShort));
        localStorage.setItem("queryText", JSON.stringify(queryText));

        console.log(queryText);
        console.log(checkShort);

        const movies = JSON.parse(localStorage.getItem("moviesStorage"));
        const searchText = queryText.toLowerCase();
        const filteredMovies = movies.filter((item) => {
          return item.nameRU.toLowerCase().includes(searchText);
        });
        const shortFilteredMovies = filteredMovies.filter((item) => {
          console.log(typeof item.duration);
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

  //

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
      {!isLoading && <MoviesCardList cards={cards} />}
      <div className="movies__another-one-button-wrapper">
        <button className="movies__another-one-button">Еще</button>
      </div>
      <Footer />
    </section>
  );
}

export default Movies;
