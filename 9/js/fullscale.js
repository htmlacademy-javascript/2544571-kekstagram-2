import { isEscapeKey } from './utils'; // Импортируем функцию проверки нажатия Esc
import { genPicturesArray } from './miniatures'; // Импортируем массив, на основе которого отрисовывались фотографии

// Находим элементы на странице
const bigPicture = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const picturesContainer = document.querySelector('.pictures');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImgBlock = bigPicture.querySelector('.big-picture__img');
const bigPictureImg = bigPictureImgBlock.querySelector('img');
const bigPictureLikesCount = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentContainer = bigPicture.querySelector('.social__comments');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

// Создаем шаблон для добавления комментариев
const commentTemplate = document.createElement('li');
commentTemplate.classList.add('social__comment');
commentTemplate.innerHTML = `<img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>`;

// Создаем фрагмент, куда будем добавлять комментарии
const genCommentsFragment = document.createDocumentFragment();

// Функция для подсчета количества показанных комментариев к фотографии
const getShownComments = () => {
  shownCommentsCount.textContent = commentContainer.querySelectorAll('li').length - commentContainer.querySelectorAll('li[class="social__comment hidden"]').length;
};

// Функция, создающая комментарии к фотографии из данных из массива
const genComments = (dataArray) => {
  dataArray.forEach(({ avatar, message, name }) => {
    // const commentElement = comment.cloneNode(true);
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    genCommentsFragment.appendChild(commentElement);
  });
  commentContainer.innerHTML = '';
  commentContainer.appendChild(genCommentsFragment);
};

// Функция для обработчика события на нажатие Esc при открытом модальном окне
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция открытия модального окна
function openBigPicture() {
  bigPicture.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
}

// Функция закрытия модального окна
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeyDown);
}

// Добавляем событие на кнопку закрытия
bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

// Функция для обработчика события по клику на миниатюру
function onMiniatureClick(evt) {
  if (evt.target.matches('img[class="picture__img"]')) {
    evt.preventDefault();
    // Проверяем дата-атрибут фотографии с ее айди в массиве данных
    const elemData = genPicturesArray.find((element) => element.id === Number(evt.target.dataset.pictureId));
    bigPictureImg.src = elemData.url;
    bigPictureLikesCount.textContent = elemData.likes;
    bigPictureCommentsCount.textContent = elemData.comment.length;
    bigPictureDescription.textContent = elemData.description;
    genComments(elemData.comment);
    getShownComments();
    openBigPicture();

    // Скрываем счетчик комментариев и кнопку "загрузить еще" (по условиям задания)
    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  }
}

// Добавляем событие на миниатюры (родительский элемент)
picturesContainer.addEventListener('click', onMiniatureClick);

