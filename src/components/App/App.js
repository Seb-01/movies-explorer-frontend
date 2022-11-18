import { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import MainHeaderAuthorized from "../MainHeaderAuthorized/MainHeaderAuthorized";
import MainHeader from "../MainHeader/MainHeader";
import banner from "../../images/landing-logo.svg";
import NavTab from "../NavTab/NavTab";
import PopupMenu from "../PopupMenu/PopupMenu";
import { register } from "../../utils/MainApi";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  const history = useHistory();

  // переменные состояния, отвечающие за видимость попапов
  const [popups, setPopups] = useState({
    isPopupMenuOpen: false,
  });

  // закрытие попапов
  function closeAllPopups(evt) {
    setPopups({
      isPopupMenuOpen: false,
    });
  }

  // открытие попап-меню
  function updateIsOpenPopupMenu(evt) {
    // alert("Нажата кнопка!");
    setPopups({
      isPopupMenuOpen: !popups.isPopupMenuOpen,
    });
  }

  // регистрация нового пользователя
  const onRegister = (name, email, password) => {
    // сюда добавим логику обработки формы регистрации
    register(email, password, name)
      // здесь уже данные пользователя от сервера
      .then((res) => {
        console.log(res);
        if (res) {
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя: ${err}!`);
      });
  };

  return (
    <main className="App">
      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <MainHeaderAuthorized
              updateIsOpenPopupMenu={updateIsOpenPopupMenu}
            />
          ) : (
            <MainHeader />
          )}
          <Promo banner={banner} />
          <NavTab />
          <AboutProject />
          <Techs />
          <AboutMe />
          <Portfolio />
          <Footer />
        </Route>
        <Route path="/movies">
          <Movies updateIsOpenPopupMenu={updateIsOpenPopupMenu} />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies updateIsOpenPopupMenu={updateIsOpenPopupMenu} />
          <Footer />
        </Route>
        <Route path="/profile">
          <Profile
            title="Вячеслав"
            buttonSubmitText="Редактировать"
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
        </Route>
        <Route path="/signin">
          <Login title="Рады видеть!" buttonSubmitText="Войти" />
        </Route>
        <Route path="/signup">
          <Register
            buttonSubmitText="Зарегистрироваться"
            title="Добро пожаловать!"
            minLengthName={2}
            maxLengthName={30}
            minLengthPassword={8}
            maxLengthPassword={200}
            onRegister={register}
          />
        </Route>
      </Switch>
      {/* попап меню */}
      <PopupMenu
        isOpen={popups.isPopupMenuOpen}
        onClose={closeAllPopups}
        updateIsOpenPopupMenu={updateIsOpenPopupMenu}
      />
    </main>
  );
}

export default App;
