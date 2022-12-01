// export const MAIN_API_CONFIG = {
//   URL: "https://api.nomoreparties.co",
// };

export const MOVIES_API_CONFIG_DEV = {
  URL: "https://api.nomoreparties.co/beatfilm-movies",
};

export const MAIN_API_CONFIG_DEV = {
  URL: "https://api.seb.diploma.nomoredomains.club",
};

export const ERRORS = {
  REQUEST_ERROR:
    "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз",
  REGISTER_ERROR_COMMON: "При регистрации пользователя произошла ошибка.",
  REGISTER_ERROR_DUBLICATE_EMAIL: "Пользователь с таким email уже существует",
  LOGIN_ERROR_COMMON: "Вы ввели неправильный логин или пароль. ",
  LOGIN_ERROR_WRONG_DUBLICATE_EMAIL:
    "Пользователь с таким email уже существует",
  UPDATE_PROFILE_ERROR_DUBLICATE_EMAIL:
    "Пользователь с таким email уже существует",
  UPDATE_PROFILE_ERROR_COMMON: "При обновлении профиля произошла ошибка",
};
