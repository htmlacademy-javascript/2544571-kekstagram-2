// Функция для проверки длины строки.

const isEqualLessLength = (word, wordLength) => word.length <= wordLength;

isEqualLessLength('123456789',8);

// Функция для проверки, является ли строка палиндромом

const isPalindrome = (initString) => {
  const normalString = initString.toLowerCase().replaceAll(' ','');
  const reverseString = normalString.split('').reverse().join('');
  return reverseString === normalString;
};

isPalindrome(' Топ ПОТ');

// Функция, принимающая строку и возвращающая числа из неё

const extractNumber = (text) => {
  const numbersRow = text.toString().split('').filter((value) => parseInt(value,10)).join('');
  const result = parseInt(numbersRow,10);
  return result;
};

extractNumber(-1.8);

//Функции возвращаются
//Перевод времени в минуты
const getMinutes = (time) => {
  const stringTime = time.split(':');
  return +stringTime[0] * 60 + +stringTime[1];
};

// результирующая функция
const isRightTime = (dayStart, dayEnd, meetingStart, meetingDuration) =>
  getMinutes(dayStart) <= getMinutes(meetingStart) && (getMinutes(meetingStart) + meetingDuration) <= getMinutes(dayEnd);

isRightTime('08:00', '17:30', '14:00', 90);

//Примеры применения

// console.log(isRightTime('08:00', '17:30', '14:00', 90)); // true
// console.log(isRightTime('8:0', '10:0', '8:0', 120)); // true
// console.log(isRightTime('08:00', '14:30', '14:00', 90)); // false
// console.log(isRightTime('14:00', '17:30', '08:0', 90)); // false
// console.log(isRightTime('8:00', '17:30', '08:00', 900)); // false


