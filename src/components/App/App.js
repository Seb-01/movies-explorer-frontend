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

  // ширина экрана
  const [screenWide, setScreenWide] = useState(0);

  // стейт-переменная со статусом пользователя - вошел в систему или нет?
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  // // отслеживаем ширину экрана
  // useEffect(() => {
  //   // Список действий внутри одного хука
  //   window.addEventListener("resize", handleResize);

  //   // Возвращаем функцию, которая удаляет эффекты
  //   // Такой возвращаемый колбэк обычно называется “cleanup” (от англ. «очистка»)
  //   // чтобы «подчистить» результаты эффекта когда компонент будет размонтирован
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  //   // Если у хука не указаны зависимости, он будет вызван после каждого рендера
  // }, []);

  // const handleResize = (event) => {
  //   // Внутренний размер окна — это ширина и высота области просмотра (вьюпорта).
  //   console.log(window.innerWidth);
  //   setScreenWide(window.innerWidth);
  // };

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
    setLoggedIn(false);
    history.push("/signin");
  };

  // разлогин пользователя
  const onSearch = () => {
    alert("Поиск!");
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
    //  else {
    //   setCurrentUser({
    //     name: "",
    //     email: "",
    //     _id: "",
    //   });
    // }
  }, [loggedIn]);

  return (
    // внедряем общий контекст с помощью провайдера со значением стейта currentUser
    // Компонент Provider имеет пропс value со значением, которое нужно распространить всем дочерним элементам
    <CurrentUserContext.Provider
      value={{ currentUser: currentUser, screenWide: screenWide }}
    >
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
          {/* <Route path="/movies">
            <Movies updateIsOpenPopupMenu={updateIsOpenPopupMenu} />
            <Footer />
          </Route> */}
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            onSearch={onSearch}
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
          {/* <Route path="/saved-movies">
            <SavedMovies updateIsOpenPopupMenu={updateIsOpenPopupMenu} />
            <Footer />
          </Route> */}
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            updateIsOpenPopupMenu={updateIsOpenPopupMenu}
          />
          {/* <Route path="/profile">
            <Profile
              title="Вячеслав"
              buttonSubmitText="Редактировать"
              updateIsOpenPopupMenu={updateIsOpenPopupMenu}
              onUpdateUserProfile={onUpdateUserProfile}
              onLogout={onLogout}
            />
          </Route> */}
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
