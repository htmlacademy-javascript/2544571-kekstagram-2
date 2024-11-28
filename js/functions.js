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

