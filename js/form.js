// импорт функции отправки данных
import { sendData } from './api.js';

// Импортируем функцию проверки нажатия Esc
import { isEscapeKey } from './utils.js';

// импортируем функцию сброса эффектов изображения
import { resetEffectsParameters } from './image-effects.js';

const bodyElement = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const uploadButton = imageUploadForm.querySelector('#upload-submit');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadOverlayCloseButton = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const commentsInput = uploadOverlay.querySelector('.text__description');

// константы, используемые в модуле
const COMMENT_LENGTH = 140;
const HASHTAGS_AMOUNT = 5;
const PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;

// тексты ошибок - СЛОВАРЬ?
const errorsText = {
  hashtagsInvalid: 'введён невалидный хэштег',
  hashtagsLimit: 'превышено количество хэштегов',
  hashtagsRepeat: 'хэштеги повторяются',
  commentLength: 'длина комментария больше 140 символов'
};

//Создаем экземпляр Пристин
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
}, true);


// функции для блокировки и разблокировки кнопки отправки формы
const blockUploadButton = () => {
  uploadButton.disabled = true;
};

const unblockUploadButton = () => {
  uploadButton.disabled = false;
};

// функция проверки длины комментария
const validateCommentLength = (value) => value.length <= COMMENT_LENGTH;

// функция получения массива хэштегов в нижнем регистре (фильтром реализован сценарий с множеством пробелов м/у хэштегами)
const getHashtagsArray = (hashtags) => {
  const hashtagsSplited = hashtags.trim().split(' '); // разделили по пробелам
  const hashtagsFiltered = hashtagsSplited.filter((word) => word !== ''); // убрали возможные пустые элементы
  return hashtagsFiltered.map((hashtag) => hashtag.toLowerCase()); // привели к нижнему регистру
};

// функция для проверки количества хэштегов
const validateHashtagsAmount = (value) => getHashtagsArray(value).length <= HASHTAGS_AMOUNT;

// функция проверки хэштегов на соответствие паттерну
const validateHashtagsPattern = (value) => {
  const isCorrect = (currentValue) => PATTERN.test(currentValue);
  return getHashtagsArray(value).every(isCorrect);
};

// функция проверки хэштегов на уникальность
const validateHastagsAreUnique = (value) => {
  const array = getHashtagsArray(value);
  const set = new Set(array);
  return (array.length === [...set].length);
};

// функция закрытия модального окна по Esc
const onDocumentKeyDown = (evt) => {
  const activeElement = document.activeElement; // ПРАВКА - добавлено условие на активные поля хэштега и коммента
  if (isEscapeKey(evt) && activeElement !== commentsInput && activeElement !== hashtagsInput) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

// Функция открытия модального окна
const openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeyDown);
};

// Функция закрытия модального окна
function closeUploadOverlay() { // function declaration так как нужно поднятие для использования в onDocumentKeyDown
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  imageUploadForm.reset(); // вызываем ресет формы после закрытия модального окна
  pristine.reset(); // ресет Пристин (иначе при открытии остаются висеть сообщения об ошибках с прошлого раза)
  resetEffectsParameters(); // вызываем ресет параметров для эффектов изображения

  document.removeEventListener('keydown', onDocumentKeyDown);
}

// добавляем валидатор на длину комментария
pristine.addValidator(commentsInput, validateCommentLength, errorsText.commentLength);

// добавляем валидатор на количество хэштегов
pristine.addValidator(hashtagsInput, validateHashtagsAmount, errorsText.hashtagsLimit);

// добавляем валидатор на паттерн хэштегов
pristine.addValidator(hashtagsInput, validateHashtagsPattern, errorsText.hashtagsInvalid);

// добавляем валидатор на уникальность хэштегов
pristine.addValidator(hashtagsInput, validateHastagsAreUnique, errorsText.hashtagsRepeat);

// добавляем закрытие модального окна на кнопку
uploadOverlayCloseButton.addEventListener('click', closeUploadOverlay);

// добавляем открытие модального окна на инпут при изменении содержания (загрузки изображения)
imageUploadInput.addEventListener('change', () => {
  openUploadOverlay();
});

/*
// не даем отправить форму если не пройдена валидация
imageUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}); */

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockUploadButton();
    sendData(new FormData(evt.target))
      .then(closeUploadOverlay)
      .catch(
        (err) => {
          console.log(err.message);
        }
      )
      .finally(unblockUploadButton);
  }
});
