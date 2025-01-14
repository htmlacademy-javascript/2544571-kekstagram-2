// Импорт функции которая перемешивает массив
import { shuffleArray, debounce } from './utils.js';

// Находим элементы, задаем константы
const filterBlock = document.querySelector('.img-filters');
const defaultButton = filterBlock.querySelector('#filter-default');
const randomButton = filterBlock.querySelector('#filter-random');
const discussedButton = filterBlock.querySelector('#filter-discussed');

const RANDOM_AMOUNT = 10;
const RERENDER_DELAY = 500;

// Функция, подсвечивающая вкладку с активным фильтром
const onClickToogleActive = (evt) => {
  if (evt.target.matches('.img-filters__button')) {
    const previous = filterBlock.querySelector('.img-filters__button--active');
    previous.classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

// Функция, отрисовывающая фотографии c фильтром по умолчанию
const setDefaultFilter = (array, miniaturesFunction, fullscaleFuncion) => {
  miniaturesFunction(array);
  fullscaleFuncion(array);
};

// Функция для получения массива с необходимым количеством случайных фотографий
const getRandomArray = (array) => {
  const resultArray = array.slice();
  shuffleArray(resultArray);
  return resultArray.slice(0, RANDOM_AMOUNT);
};

// Функция, отрисовывающая фотографии с рандомным фильтром
const setRandomFilter = (array, miniaturesFunction, fullscaleFuncion) => {
  const randomArray = getRandomArray(array);
  miniaturesFunction(randomArray);
  fullscaleFuncion(randomArray);
};

// Функция для сравнения фото по количеству комментариев

const comparePhoto = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

// Функция для получения массива фото, остортированного по количеству комментариев

const sortArrayByComments = (array) => {
  const sortedArray = array.slice();
  return sortedArray.sort(comparePhoto);
};

// Функция, отрисовывающая фотографии в зависимости от количества комментариев

const setDiscussedFilter = (array, miniaturesFunction, fullscaleFuncion) => {
  const sortedArray = sortArrayByComments(array);
  miniaturesFunction(sortedArray);
  fullscaleFuncion(sortedArray);
};

// Функция, устанавливающая фильтры
const setFilters = (array, miniaturesFunction, fullscaleFuncion) => {
  setDefaultFilter(array, miniaturesFunction, fullscaleFuncion);
  filterBlock.classList.remove('img-filters--inactive');

  defaultButton.addEventListener('click', debounce(
    () => setDefaultFilter(array, miniaturesFunction, fullscaleFuncion),RERENDER_DELAY));
  randomButton.addEventListener('click', debounce(
    () => setRandomFilter(array, miniaturesFunction, fullscaleFuncion),RERENDER_DELAY));
  discussedButton.addEventListener('click', debounce(
    () => setDiscussedFilter(array, miniaturesFunction, fullscaleFuncion),RERENDER_DELAY));

};

// Добавляем подсвечивание активной вкладки с фильтром по клику
filterBlock.addEventListener('click', onClickToogleActive);

export { setFilters };

