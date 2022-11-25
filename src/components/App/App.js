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
import {
  register,
  login,
  getUserProfile,
  updateUserProfile,
} from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  // данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });

  // стейт-переменная со статусом пользователя - вошел в систему или нет?
  const [loggedIn, setLoggedIn] = useState(false);

  // // переменная состояния, отвечающая за стейт данных о карточках
  // const [cards, setCards] = useState([]);

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
  const onRegister = (email, password, name) => {
    // сюда добавим логику обработки формы регистрации
    // здесь важно порядок аргументов не перепутать!
    // console.log(email + " " + password + " " + name);
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

  // авторизация пользователя
  const onLogin = (email, password) => {
    // сюда добавим логику обработки формы логина
    login(email, password)
      // здесь уже токен от сервера получаем
      .then((res) => {
        console.log(res);
        if (res) {
          // Если сюда пришли, значит токен успешно сохранен в localStorage
          // выставляем loggedIn в true и соответствующий хук среагирует,
          // сохранив данные о пользователе в глобальную стейт-переменную currentUser
          setLoggedIn(true);
          // переходим на страницу с фильмами
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации пользователя: ${err}!`);
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
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя: ${err}!`);
      });
  };

  // разлогин пользователя
  const onLogout = () => {
    localStorage.removeItem("jwt");
    // очищаем полностью?
    // localStorage.clear();
    setLoggedIn(false);
    history.push("/signin");
  };

  // добавляем эффект, вызываемый при монтировании компонента: запрос в API данных пользователя
  useEffect(() => {
    if (loggedIn) {
      getUserProfile()
        // обрабатываем полученные данные и деструктурируем ответ от сервера, чтобы было понятнее, что пришло
        .then((userData) => {
          // меняем currentUser пользователя
          // console.log(userData);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(`Ошибка при запросе данных пользователя: ${err}!`);
        });
    }
  }, [loggedIn]);

  const handleCardClick = (trailerLink) => {
    window.open(trailerLink);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      tokenCheck();
    }
  }, []);

  const tokenCheck = () => {
    return (
      getUserProfile()
        // обрабатываем полученные данные и деструктурируем ответ от сервера, чтобы было понятнее, что пришло
        .then((userData) => {
          setCurrentUser(userData);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`Ошибка при запросе данных пользователя: ${err}!`);
        })
    );
  };

  // Проверка токена
  // function checkToken() {
  //   // если у пользователя есть токен в localStorage, эта функция проверит валидность токена
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     // apiAuth
  //     api
  //       .getContent(jwt)
  //       .then((res) => {
  //         // console.log(jwt);
  //         // console.log(JSON.stringify(res));
  //         if (res) {
  //           // setUserEmail(res.data.email);
  //           setUserEmail(res.email);
  //           setLoggedIn(true);
  //         }
  //         history.push("/");
  //       })
  //       .catch((err) => {
  //         console.log(`Ошибка при проверке токена: ${err}!`);
  //       });
  //   }
  // }

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
            component={Movies}
            onCardClick={handleCardClick}
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            onCardClick={handleCardClick}
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
          <ProtectedRoute
            component={Profile}
            path="/profile"
            loggedIn={loggedIn}
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

export default App;
