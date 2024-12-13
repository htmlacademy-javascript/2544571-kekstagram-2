// Импортируем функцию для создания массива с картинками
import { createPhotosArray } from './data.js';

// Находим необходимые элементы в разметке, создаем массив картинок и фрагмент
const genPicturesContainer = document.querySelector('.pictures');
const genPictureTemplate = document.querySelector('#picture').content;
const genPicturesArray = createPhotosArray();
const genPicturesFragment = document.createDocumentFragment();

// Используем forEach для переноса данных из массива в подготовленный фрагмент
genPicturesArray.forEach(({ url, description, likes, comment }) => {
  const pictureElement = genPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comment.length;
  genPicturesFragment.appendChild(pictureElement);
});

// Добавляем фрагмент в разметку
genPicturesContainer.appendChild(genPicturesFragment);

