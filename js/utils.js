const DATA_ERROR_SHOW_TIME = 5000;

const dataErrorTemplate = document.querySelector('#data-error').content;
const bodyElement = document.querySelector('body');

// функция создания элемента из шаблона
const createElement = (template) => {
  const element = template.cloneNode(true);
  bodyElement.appendChild(element);
};

// функция показа/удаления сообщения об ошибке/успехе отправки данных

const showUploadAlert = (result) => createElement(document.querySelector(`#${result}`).content);

const hideUploadAlert = (result) => document.querySelector(`.${result}`).remove();

// функция показа ошибки при загрузке данных (c таймером)
const showDataError = () => {
  createElement(dataErrorTemplate);
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, DATA_ERROR_SHOW_TIME);
};

//Функция для проверки нажатия Escape в событии
const isEscapeKey = (evt) => evt.key === 'Escape';

//Экспорт функций
export { isEscapeKey, showDataError, showUploadAlert, hideUploadAlert };

