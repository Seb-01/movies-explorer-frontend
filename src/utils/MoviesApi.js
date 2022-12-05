import { MOVIES_API_CONFIG_DEV } from "./utils";

const { URL } = MOVIES_API_CONFIG_DEV;

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

/** Получение всех фильмов
 *
 */
export const getMovies = () => {
  return (
    fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // выполнится, если промис исполнен. Аргумент - функция обработчик успешного выполнения промиса
      .then((res) => checkResponse(res))
  );
};
