const DATA_ERROR_SHOW_TIME = 5000;

const successUploadTemplate = document.querySelector('#success').content;
const errorUploadTemplate = document.querySelector('#error').content;
const dataErrorTemplate = document.querySelector('#data-error').content;
const bodyElement = document.querySelector('body');

// функция создания элемента из шаблона
const createElement = (template) => {
  const element = template.cloneNode(true);
  bodyElement.appendChild(element);
};

// функция показа ошибки при загрузке данных
const showDataError = () => {
  createElement(dataErrorTemplate);
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, DATA_ERROR_SHOW_TIME);
};

//Функция, выводящая случайное целое число из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, выводящая случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция для проверки нажатия Escape в событии
const isEscapeKey = (evt) => evt.key === 'Escape';

//Экспорт функций
export { getRandomArrayElement, getRandomInteger, isEscapeKey, showDataError };


