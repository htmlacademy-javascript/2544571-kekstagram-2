// константы для URL сервера и вариантов для загрузки/отправки
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '',
};

// константы для метода fetch
const Method = {
  GET: 'GET',
  POST: 'POST',
};

// константы для текста ошибок
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// базовая функция для загрузки/отправки
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

// функция для загрузки
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

// функция для отправки
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

// экспорт функций
export {getData, sendData};
