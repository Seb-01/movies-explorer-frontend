import { useState, useEffect } from "react";
import { withRouter } from "react-router";
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
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import MainHeaderAuthorized from "../MainHeaderAuthorized/MainHeaderAuthorized";
import MainHeader from "../MainHeader/MainHeader";
import banner from "../../images/landing-logo.svg";
import NavTab from "../NavTab/NavTab";
import PopupMenu from "../PopupMenu/PopupMenu";
import {
  register,
  login,
  updateUserProfile,
  getContent,
} from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { ERRORS } from "../../utils/utils";

function App() {
  // данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });

  // стейт-переменная со статусом пользователя - вошел в систему или нет?
  // const [loggedIn, setLoggedIn] = useState(
  //   localStorage.getItem("jwt") ? true : false
  // );
  const [loggedIn, setLoggedIn] = useState(false);

  const [errorLogin, setErrorLogin] = useState("");
  const [errorRegister, setErrorRegister] = useState("");

  const [resultUpdateProfile, setResultUpdateProfile] = useState("");

  const history = useHistory();

  const { pathname } = useLocation();

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
  const onRegister = (email, password, name) => {
    // сюда добавим логику обработки формы регистрации
    // здесь важно порядок аргументов не перепутать!
    // console.log(email + " " + password + " " + name);
    setErrorRegister("");
    register(email, password, name)
      // здесь уже данные пользователя от сервера
      .then((res) => {
        console.log(res);

        if (res) {
          setErrorRegister("");
          history.replace("/signin");
          onLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(`Ошибка при регистрации пользователя: ${err}!`);
        setErrorRegister(ERRORS.REGISTER_ERROR_COMMON);
      });
  };

  // авторизация пользователя
  const onLogin = (email, password) => {
    // сюда добавим логику обработки формы логина
    setErrorLogin("");
    login(email, password)
      // здесь уже токен от сервера получаем
      .then((res) => {
        if (res) {
          // Если сюда пришли, значит токен успешно сохранен в localStorage
          // выставляем loggedIn в true и соответствующий хук среагирует,
          // сохранив данные о пользователе в глобальную стейт-переменную currentUser
          console.log(res);
          // здесь можем получить данные пользователя!
          const jwt = localStorage.getItem("jwt");
          tokenCheck(jwt);

          setLoggedIn(true);
          setErrorLogin("");
          // переходим на страницу с фильмами
          history.replace("/movies");
        }
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации пользователя: ${err}!`);
        setErrorLogin(ERRORS.LOGIN_ERROR_COMMON);
      });
  };

  // обновление данных профиля
  const onUpdateUserProfile = (newName, newEmail) => {
    updateUserProfile(newName, newEmail)
      // обрабатываем полученные данные и деструктурируем ответ от сервера, чтобы было понятнее, что пришло
      .then((userData) => {
        // меняем состояние профиля пользователя
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          email: userData.email,
        });
        // как-то уведомляем пользователя
        setResultUpdateProfile("Профиль успешно обновлен!");
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя: ${err}!`);
        setResultUpdateProfile("При обновлении профиля произошла ошибка!");
      });
  };

  // разлогин пользователя
  const onLogout = () => {
    localStorage.removeItem("jwt");
    // очищаем полностью?
    localStorage.clear();
    setLoggedIn(false);
    history.replace("/signin");
  };

  const handleCardClick = (trailerLink) => {
    window.open(trailerLink);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    console.log(`Монтирую App, pathname: ${pathname}`);
    tokenCheck(jwt);
  }, []);

  // проверка токена
  const tokenCheck = (jwt) => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    if (jwt) {
      // проверим токен
      getContent(jwt)
        .then((userData) => {
          if (userData) {
            // здесь можем получить данные пользователя!
            setCurrentUser(userData);
            // авторизуем пользователя
            setLoggedIn(true);
            // Если пользователь был авторизован и закрыл вкладку, он может вернуться
            // сразу на любую страницу приложения по URL-адресу, кроме страниц авторизации и регистрации

            if (pathname === "/signin" || pathname === "/signup")
              history.replace("/movies");
            else history.replace(pathname);
          }
        })
        .catch((err) => {
          console.log(`Ошибка при запросе данных пользователя: ${err}!`);
          // токен не валидный - делаем полный "логаут" пользователя а главную страницу
          // с шапкой неавторизованного пользователя с удалением всей его информации из хранилища и стейтов
          // При попытке перейти на любой защищённый роут происходит редирект на /
          localStorage.clear();
          if (pathname === "/signin" || pathname === "/signup")
            history.replace(pathname);
          else history.replace("/");
        });
    } else {
      history.replace("/");
    }
  };

  return (
    // внедряем общий контекст с помощью провайдера со значением стейта currentUser
    // Компонент Provider имеет пропс value со значением, которое нужно распространить всем дочерним элементам
    <CurrentUserContext.Provider value={currentUser}>
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
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            // location={pathname}
            component={Movies}
            onCardClick={handleCardClick}
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            // location={pathname}
            component={SavedMovies}
            onCardClick={handleCardClick}
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
          <ProtectedRoute
            component={Profile}
            path="/profile"
            loggedIn={loggedIn}
            location={pathname}
            resultUpdateProfile={resultUpdateProfile}
            buttonSubmitText="Редактировать"
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
            onUpdateUserProfile={onUpdateUserProfile}
            onLogout={onLogout}
          />
          <Route path="/signin">
            <Login
              title="Рады видеть!"
              buttonSubmitText="Войти"
              minLengthPassword={8}
              maxLengthPassword={200}
              onLogin={onLogin}
              error={errorLogin}
            />
          </Route>
          <Route path="/signup">
            <Register
              buttonSubmitText="Зарегистрироваться"
              title="Добро пожаловать!"
              minLengthName={2}
              maxLengthName={30}
              minLengthPassword={8}
              maxLengthPassword={200}
              onRegister={onRegister}
              error={errorRegister}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        {/* попап меню */}
        <PopupMenu
          isOpen={popups.isPopupMenuOpen}
          onClose={closeAllPopups}
          updateIsOpenPopupMenu={updateIsOpenPopupMenu}
        />
      </main>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
