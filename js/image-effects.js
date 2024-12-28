const imageUploadForm = document.querySelector('.img-upload__form');
const smallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const biggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const scaleInput = imageUploadForm.querySelector('.scale__control--value');
const previewImage = imageUploadForm.querySelector('.img-upload__preview img');
const sliderElement = imageUploadForm.querySelector('.effect-level__slider');
const sliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const effectsList = imageUploadForm.querySelector('.effects__list');
const effectLevel = imageUploadForm.querySelector('.effect-level__value');

const sepiaButton = imageUploadForm.querySelector('#effect-sepia');
const chromeButton = imageUploadForm.querySelector('#effect-chrome');
const marvinButton = imageUploadForm.querySelector('#effect-marvin');
const phobosButton = imageUploadForm.querySelector('#effect-phobos');
const heatButton = imageUploadForm.querySelector('#effect-heat');

const ScaleMeasures = { // Параметры для масштаба ПЕРЕЧИСЛЕНИЕ?
  MAX: 100,
  MIN: 25,
  STEP: 25
};

let scale = 100; // Глобальная переменная для масштаба

const sliderParameters = { // Параметры слайдера для разных фильтров (мин, макс, шаг) СЛОВАРЬ?
  chrome: [0, 1, 0.1],
  sepia: [0, 1, 0.1],
  marvin: [0, 100, 1],
  phobos: [0, 3, 0.1],
  heat: [1, 3, 0.1],
};

const getSliderSetting = (filter) => { // Функция для получения параметров в зависимости от фильтра
  const elem = sliderParameters[filter];
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

const setSlider = (filter) => { // функция, выводящая слайдер с нужными настройками
  sliderElement.noUiSlider.updateOptions(getSliderSetting(filter));
  sliderContainer.classList.remove('hidden');
};

const resetEffectsParameters = () => { // функция ресета параметров эффектов
  scale = 100;
  previewImage.style.removeProperty('transform');
  previewImage.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  effectLevel.value = 100;
};

sliderContainer.classList.add('hidden'); // Скрываем контейнер слайдера по умолчанию

noUiSlider.create(sliderElement, getSliderSetting('chrome')); // создаем слайдер (параметры не важны, так как он скрыт)

effectsList.addEventListener('change', (evt) => { // устанавливаем событие на кнопки переключения эффектов
  switch (true) {
    case (evt.target.matches('#effect-chrome')): setSlider('chrome'); break;
    case (evt.target.matches('#effect-sepia')): setSlider('sepia'); break;
    case (evt.target.matches('#effect-marvin')): setSlider('marvin'); break;
    case (evt.target.matches('#effect-phobos')): setSlider('phobos'); break;
    case (evt.target.matches('#effect-heat')): setSlider('heat'); break;
    case (evt.target.matches('#effect-none')): // переключение на фильтр без эффектов сбрасывает все параметры
      sliderContainer.classList.add('hidden');
      effectLevel.value = 100;
      previewImage.style.removeProperty('filter');
      break;
  }
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
