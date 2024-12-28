const imageUploadForm = document.querySelector('.img-upload__form');
const smallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleInput = imageUploadForm.querySelector('.scale__control--value');
const previewImage = imageUploadForm.querySelector('.img-upload__preview img');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imageUploadForm.querySelector('.effects__list');
const effectLevel = imageUploadForm.querySelector('.effect-level__value');

// Параметры для масштаба ПЕРЕЧИСЛЕНИЕ?
const ScaleMeasures = {
  MAX: 100,
  MIN: 25,
  STEP: 25
};

// Параметры слайдера для разных фильтров (эффект: мин, макс, шаг, стиль, единицы измерения) СЛОВАРЬ?
const sliderParameters = {
  'effect-chrome': [0, 1, 0.1, 'grayscale(', ')'],
  'effect-sepia': [0, 1, 0.1, 'sepia(', ')'],
  'effect-marvin': [0, 100, 1, 'invert(', '%)'],
  'effect-phobos': [0, 3, 0.1, 'blur(', 'px)'],
  'effect-heat': [1, 3, 0.1, 'brightness(', ')'],
};

// Глобальная переменная для масштаба
let scale = 100;

// Функция для получения параметров в зависимости от фильтра
const getSliderSetting = (effect) => {
  const sliderParameter = sliderParameters[effect];
  const sliderSetting =
  {
    range: {
      min: sliderParameter[0],
      max: sliderParameter[1],
    },
    start: sliderParameter[1],
    step: sliderParameter[2],
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
  return sliderSetting;
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

// Скрываем контейнер слайдера по умолчанию
sliderContainer.classList.add('hidden');

// создаем слайдер (параметры не важны, так как он скрыт)
noUiSlider.create(sliderElement, getSliderSetting('effect-chrome'));

// устанавливаем событие на кнопки переключения эффектов
effectsList.addEventListener('change', (evt) => {
  const id = evt.target.id;
  return id === 'effect-none' ? resetSliderEffects() : setSlider(id);
});

// устанавливаем событие на движение слайдера, в зависимости от эффекта
sliderElement.noUiSlider.on('update', () => {
  const level = sliderElement.noUiSlider.get();
  effectLevel.value = level;
  const effect = sliderParameters[imageUploadForm.querySelector('input.effects__radio:checked').id]; // активный эффект
  if (effect) { // при старте программы эффект выводился как пустой (почему?), поэтому - через if
    previewImage.style.filter = (effect[3] + level + effect[4]); // создаем строку, содержащую необходимый стиль
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
