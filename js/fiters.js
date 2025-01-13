// Импорт функции которая перемешивает массив
import { shuffleArray } from './utils.js';

// Находим элементы, задаем константы
const filterBlock = document.querySelector('.img-filters');
const defaultButton = filterBlock.querySelector('#filter-default');
const randomButton = filterBlock.querySelector('#filter-random');
const discussedButton = filterBlock.querySelector('#filter-discussed');

const RANDOM_AMOUNT = 10;

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

// Функция, отрисовывающая фотографии в зависимости от количества комментариев

const setDiscussedFilter = (array, miniaturesFunction, fullscaleFuncion) => {
  const sortedArray = sortArrayByComments(array);
  miniaturesFunction(sortedArray);
  fullscaleFuncion(sortedArray);
};

// Функция, устанавливающая фильтры
const setFilters = (array, miniaturesFunction, fullscaleFuncion) => {
  filterBlock.classList.remove('img-filters--inactive');

  defaultButton.addEventListener('click', () => setDefaultFilter(array, miniaturesFunction, fullscaleFuncion));
  randomButton.addEventListener('click', () => setRandomFilter(array, miniaturesFunction, fullscaleFuncion));

};

// Добавляем подсвечивание активной вкладки с фильтром по клику
filterBlock.addEventListener('click', onClickToogleActive);

export { setDefaultFilter, setFilters };

