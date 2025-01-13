// Импорт функции которая перемешивает массив
import { shuffleArray } from './utils.js';

// Находим элементы, задаем константы
const filterBlock = document.querySelector('.img-filters');
const defaultButton = filterBlock.querySelector('#filter-default');
const randomButton = filterBlock.querySelector('#filter-random');
const discussedButton = filterBlock.querySelector('#filter-discussed');

const RANDOM_AMOUNT = 10;

filterBlock.classList.remove('img-filters--inactive');

const getRandomArray = (array) => {
  const resultArray = array.slice();
  shuffleArray(resultArray);
  return resultArray.slice(0, RANDOM_AMOUNT);
};

export { getRandomArray };

