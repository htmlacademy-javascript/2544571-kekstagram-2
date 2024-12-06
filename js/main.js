//Константы с данными
const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];
const PHOTO_DESCRIPTIONS = [
  'дым на воде',
  'огонь в небесах',
  'два котика',
  'stairway to heaven',
  'not my cup of tea',
  'lorem ipsum',
  'dolor sit amet',
  'beat about the bush',
  'гора в лучах заката',
  'добро пожаловать в Седону'
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

//Константы с диапазонами
const PHOTOS_COUNT = 25;
const COMMENTS_MAX_COUNT = 30;
const MAIN_ID_COUNT = 25;
const URL_ID_COUNT = 25;
const LIKES_COUNT_BOTTOM = 15;
const LIKES_COUNT_TOP = 200;
const COMMENT_ID_COUNT = 999999;
const AVATARS_COUNT = 6;

//Функция, выводящая случайное целое число из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция, выводящая случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Функция, возвращающая функцию-генератор id (учитывающий повторения)
function createRandomIdFromRangeGenerator(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return 'not enough values';
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

//Функции - генераторы id для данных, где запрещены повторения
const generateMainId = createRandomIdFromRangeGenerator(1, MAIN_ID_COUNT);
const generateUrlId = createRandomIdFromRangeGenerator(1, URL_ID_COUNT);
const generateCommentId = createRandomIdFromRangeGenerator(1,COMMENT_ID_COUNT);

//Функция для создания комментариев
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,AVATARS_COUNT)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}${getRandomInteger(0,1) ? ` ${getRandomArrayElement(MESSAGES)}` : '' }`,
  name: getRandomArrayElement(NAMES),
});

//Функция для создания основных фото
const createPhoto = () => ({
  id: generateMainId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
  likes: getRandomInteger(LIKES_COUNT_BOTTOM,LIKES_COUNT_TOP),
  comment: Array.from({ length: getRandomInteger(0, COMMENTS_MAX_COUNT) }, createComment)
});

//Функция для создания основного массива с фото
const createPhotosArray = () => (Array.from({ length: PHOTOS_COUNT }, createPhoto));

//Вызов функции, чтобы не ругался линтер. НО: все айди, где запрещены повторы, теперь будут заняты!
createPhotosArray();

