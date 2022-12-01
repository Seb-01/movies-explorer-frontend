import { MAIN_API_CONFIG_DEV } from "./utils";

const { URL } = MAIN_API_CONFIG_DEV;

/** Метод, который проверяет ответ от сервера
 * @param {object} res - значение, переданное resolve (вызывается при успешном запросе) при создании промиса
 */
function checkResponse(res) {
  if (res.ok) {
    // Метод json читает ответ от сервера в формате json и возвращает промис для обработки следующим then
    return res.json();
  }
  // если ошибка, то отклоняем промис
  return Promise.reject(`Ошибка выполнении запроса к серверу: ${res.status}`);
}

// от Евгения Карпеля
// const checkResponse2 = (res) => {
//   // Запрос успешен, вернём распарсенный ответ
//   if (res.ok) {
//     return res.json();
//   }
//   /* Запрос неуспешен, вернулся объект ошибки. Достанем его, распарсим, обогатим кодом ошибки и вернём как ошибку */
//   return res.json().then((err) => {
//     err.errorCode = res.status;
//     return Promise.reject(err);
//   });
// };

/** Регистрация пользователя
 *
 */
export const register = (email, password, name) => {
  return (
    fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      // выполнится, если промис исполнен. Аргумент - функция обработчик успешного выполнения промиса
      .then((res) => checkResponse(res))
  );
};

/** Логин пользователя
 *
 */
export const login = (email, password) => {
  return (
    fetch(`${URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    })
      // выполнится, если промис исполнен. Аргумент - функция обработчик успешного выполнения промиса
      .then((res) => checkResponse(res))
      // получаем токен, сохраняем его в localStorage клиента
      .then((data) => {
        if (data.token) {
          // сохраняем токен
          localStorage.setItem("jwt", data.token);
          console.log(`data: ${data}`);
          console.log(`data.token: ${data.token}`);
          return data;
        } else {
          return;
        }
      })
  );
};

/** Mетод для загрузки пользовательского профиля
 *
 */
export const getUserProfile = () => {
  const jwt = localStorage.getItem("jwt");
  return fetch(`${URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

//чтобы проверить токен и получить данные пользователя
export const getContent = (token) => {
  return fetch(`${URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};

/** Метод для обновления профиля пользователя
 *
 */
export const updateUserProfile = (userNname, email) => {
  const jwt = localStorage.getItem("jwt");
  // отправляем запрос
  return fetch(`${URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: userNname,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

/** Сохранить фильм
 * передаnm в теле: country, director, duration, year, description,
 * image, trailer, nameRU, nameEN и thumbnail, movieId
 */
export const saveMovie = (
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movieId,
  nameRU,
  nameEN
) => {
  const jwt = localStorage.getItem("jwt");
  return (
    fetch(`${URL}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      }),
    })
      // выполнится, если промис исполнен. Аргумент - функция обработчик успешного выполнения промиса
      .then((res) => checkResponse(res))
  );
};

/** Получаем список сохраненных фильмов
 *
 *
 */
export const getSavedMovies = () => {
  const jwt = localStorage.getItem("jwt");
  return fetch(`${URL}/movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};

// Удаляем фильм по id
export const removeSavedMovie = (_id) => {
  const jwt = localStorage.getItem("jwt");
  return fetch(`${URL}/movies/${_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => checkResponse(res));
};
