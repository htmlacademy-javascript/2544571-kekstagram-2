// константы для URL сервера и вариантов для загрузки/отправки
const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';
const Route = {
  GET_DATA: 'data',
  SEND_DATA: '',
};

// константы для метода fetch
const Method = {
  GET: 'GET',
  POST: 'POST',
};


// базовая функция для загрузки/отправки
const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error();
    });

// функция для загрузки
const getData = () => load(Route.GET_DATA);

// функция для отправки
const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

// экспорт функций
export {getData, sendData};
