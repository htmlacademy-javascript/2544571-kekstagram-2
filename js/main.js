// Импорт модуля с миниатюрами
import './miniatures.js';

//Импорт модуля с отрисовкой полноразмерных изображений
import './fullscale.js';

//Импорт функции, формирующей фотографии
import {createPhotosArray} from './data.js';

//Вызов функции, формирующей фотографии
createPhotosArray();
