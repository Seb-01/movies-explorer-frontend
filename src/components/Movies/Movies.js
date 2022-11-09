import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { moviesDataBase } from "../../utils/utils.js";

function Movies(props) {
  return (
    <div className="movies">
      <Header updateIsOpenPopupMenu={props.updateIsOpenPopupMenu} />
      <SearchForm placeholder="Фильм" />
      {/* <Preloader /> */}
      <MoviesCardList cards={moviesDataBase} />
      <div className="movies__another-one-button-wrapper">
        <button className="movies__another-one-button">Еще</button>
      </div>
    </div>
  );
}

export default Movies;
