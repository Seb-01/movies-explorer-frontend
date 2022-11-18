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

export const register = (email, password, name) => {
  return fetch(`${URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const getUserData = (token) => {
  return fetch(`${URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

export const getSavedNews = (token) => {
  return fetch(`${URL}/articles`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

export const addNewsCard = (newsArticle, token) => {
  return fetch(`${URL}/articles`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      keyword: newsArticle.keyword,
      title: newsArticle.title,
      text: newsArticle.description,
      date: newsArticle.publishedAt,
      source: newsArticle.source.name,
      link: newsArticle.url,
      image: newsArticle.urlToImage,
    }),
  }).then((res) => checkResponse(res));
};

export const removeCard = (id, token) => {
  return fetch(`${URL}/articles/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};
