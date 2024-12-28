const imageUploadForm = document.querySelector('.img-upload__form');
const smallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleInput = imageUploadForm.querySelector('.scale__control--value');
const previewImage = imageUploadForm.querySelector('.img-upload__preview img');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imageUploadForm.querySelector('.effects__list');
const effectLevel = imageUploadForm.querySelector('.effect-level__value');

const effectButtons = imageUploadForm.querySelectorAll('input.effects__radio[name=effect]');
const sepiaButton = imageUploadForm.querySelector('#effect-sepia');
const chromeButton = imageUploadForm.querySelector('#effect-chrome');
const marvinButton = imageUploadForm.querySelector('#effect-marvin');
const phobosButton = imageUploadForm.querySelector('#effect-phobos');
const heatButton = imageUploadForm.querySelector('#effect-heat');

// Параметры для масштаба ПЕРЕЧИСЛЕНИЕ?
const ScaleMeasures = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

let flevel;

// Параметры слайдера для разных фильтров (эффект: мин, макс, шаг) СЛОВАРЬ?
const sliderParameters = {
  'effect-chrome': [0, 1, 0.1, `grayscale(${flevel})`],
  'effect-sepia': [0, 1, 0.1, `sepia(${flevel})`],
  'effect-marvin': [0, 100, 1, `invert(${flevel}%)`],
  'effect-phobos': [0, 3, 0.1, `blur(${flevel}px)`],
  'effect-heat': [1, 3, 0.1, `brightness(${flevel})`],
};

// Глобальная переменная для масштаба
let scale = 100;

// Функция для получения параметров в зависимости от фильтра
const getSliderSetting = (effect) => {
  const elem = sliderParameters[effect];
  const parameter =
  {
    range: {
      min: elem[0],
      max: elem[1],
    },
    start: elem[1],
    step: elem[2],
    connect: 'lower',
    format: {
      to: function (value) {
        return Number(value.toFixed(1)); // выводим наружу формат числа до одной десятой
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  };
  return parameter;
};

// функция, выводящая слайдер с нужными настройками
const setSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions(getSliderSetting(effect));
  sliderContainer.classList.remove('hidden');
};

// функция ресета параметров слайдера
const resetSliderEffects = () => {
  previewImage.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  effectLevel.value = 100;
};

// функция ресета всех параметров эффектов (слайдер + масштаб)
const resetEffectsParameters = () => {
  scale = 100;
  previewImage.style.removeProperty('transform');
  resetSliderEffects();
};

sliderContainer.classList.add('hidden'); // Скрываем контейнер слайдера по умолчанию

noUiSlider.create(sliderElement, getSliderSetting('effect-chrome')); // создаем слайдер (параметры не важны, так как он скрыт)

effectsList.addEventListener('change', (evt) => { // устанавливаем событие на кнопки переключения эффектов
  const id = evt.target.id;
  return id === 'effect-none' ? resetSliderEffects() : setSlider(id);
});

sliderElement.noUiSlider.on('update', () => { // устанавливаем событие на движение слайдера, в зависимости от эффекта
  const level = sliderElement.noUiSlider.get();
  effectLevel.value = level;
  switch (true) {
    case (chromeButton.checked): previewImage.style.filter = `grayscale(${level})`; break;
    case (sepiaButton.checked): previewImage.style.filter = `sepia(${level})`; break;
    case (marvinButton.checked): previewImage.style.filter = `invert(${level}%)`; break;
    case (phobosButton.checked): previewImage.style.filter = `blur(${level}px)`; break;
    case (heatButton.checked): previewImage.style.filter = `brightness(${level})`; break;
  }
});

smallerButton.addEventListener('click', () => { // Функция для кнопки "меньше"
  if (scale > ScaleMeasures.MIN) {
    scale -= ScaleMeasures.STEP;
    scaleInput.value = `${scale}%`;
    previewImage.style.transform = `scale(${scale / 100})`;
  }
});

biggerButton.addEventListener('click', () => { // Функция для кнопки "больше"
  if (scale < ScaleMeasures.MAX) {
    scale += ScaleMeasures.STEP;
    scaleInput.value = `${scale}%`;
    previewImage.style.transform = `scale(${scale / 100})`;
  }
});

export { resetEffectsParameters }; // экспортируем функцию ресета параметров (в модуль form.js)
