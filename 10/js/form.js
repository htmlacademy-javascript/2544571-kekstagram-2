import { isEscapeKey } from './utils.js'; // Импортируем функцию проверки нажатия Esc

//Импорт функции, сбрасывающей параметры эффектов (к заданию 9.2)
import {resetEffectsParameters} from './image-effects.js';

const bodyElement = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const commentsInput = uploadOverlay.querySelector('.text__description');

const errorsText = { // тексты ошибок
  hashtagsInvalid: 'введён невалидный хэштег',
  hashtagsLimit: 'превышено количество хэштегов',
  hashtagsRepeat: 'хэштеги повторяются',
  commentLength: 'длина комментария больше 140 символов'
};

const pristine = new Pristine(imageUploadForm, { //Создаем экземпляр Пристин
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);


// не даем отправить форму если не пройдена валидация

imageUploadForm.addEventListener('submit', (evt) => {
  if (pristine.validate() === false) {
    evt.preventDefault();
  }
});

function validateCommentLength(value) { // функция проверки длины комментария
  return value.length <= 140;
}

function validateHashtagsAmount(value) { // функция для проверки количества хэштегов
  return value.split(' ').length <= 5;
}

function validateHashtagsPattern(value) { // функция проверки хэштегов на соответствие паттерну
  const array = value.split(' ');
  const pattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const isCorrect = (currentValue) => pattern.test(currentValue);
  return ((value.length === 0) || array.every(isCorrect)); // ИЛИ - дополнительная проверка на пустое значение в поле
}

function validateHastagsAreUnique(value) { // функция проверки хэштегов на уникальность
  const array = value.split(' ');
  const set = new Set(array);
  return (array.length === [...set].length);
}

// добавляем валидатор на длину комментария
pristine.addValidator(commentsInput, validateCommentLength, errorsText.commentLength);

// добавляем валидатор на количество хэштегов
pristine.addValidator(hashtagsInput, validateHashtagsAmount, errorsText.hashtagsLimit);

// добавляем валидатор на паттерн хэштегов
pristine.addValidator(hashtagsInput, validateHashtagsPattern, errorsText.hashtagsInvalid);

// добавляем валидатор на уникальность хэштегов
pristine.addValidator(hashtagsInput, validateHastagsAreUnique, errorsText.hashtagsRepeat);

// функция закрытия модального окна по Esc
const onDocumentKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

// Функция открытия модального окна
function openUploadOverlay() {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);

}

// Функция закрытия модального окна
function closeUploadOverlay() {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  imageUploadForm.reset(); // вызываем ресет формы после закрытия модального окна
  resetEffectsParameters(); // вызываем ресет параметров для эффектов (задание 9.2)

  document.removeEventListener('keydown', onDocumentKeyDown);
}

// Добавляем на поля события, отменяющие закрытие оверлея по esc при фокусе на поле
hashtagsInput.onfocus = () => document.removeEventListener('keydown', onDocumentKeyDown);
hashtagsInput.onblur = () => document.addEventListener('keydown', onDocumentKeyDown);
commentsInput.onfocus = () => document.removeEventListener('keydown', onDocumentKeyDown);
commentsInput.onblur = () => document.addEventListener('keydown', onDocumentKeyDown);

// добавляем закрытие модального окна на кнопку
uploadOverlayCloseButton.addEventListener('click', closeUploadOverlay);

// добавляем открытие модального окна на на инпут при изменении содержания
imageUploadInput.addEventListener('change', () => {
  openUploadOverlay();
});

