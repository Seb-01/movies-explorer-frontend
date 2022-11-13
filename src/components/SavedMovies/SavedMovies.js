import React from "react";
import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import Preloader from "../Preloader/Preloader";
import { savedMoviesDataBase } from "../../utils/utils.js";

function SavedMovies(props) {
  return (
    <section className="movies">
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <SearchForm placeholder="Фильм" />
      {/* <Preloader /> */}
      <SavedMoviesCardList cards={savedMoviesDataBase} />
      <div className="movies__another-one-button-wrapper">
        <button className="movies__another-one-button">Еще</button>
      </div>
    </section>
  );
}

export default SavedMovies;
