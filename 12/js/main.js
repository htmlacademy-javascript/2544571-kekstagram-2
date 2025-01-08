// Импорт функции отрисовки миниатюр
import { getMiniatures } from './miniatures.js';

//Импорт функции с отрисовкой модального окна для большого изображения
import { setFullscale } from './fullscale.js';

//Импорт модуля, который обрабатывает форму
import './form.js';

//Импорт функции для получения данных
import { getData } from './api.js';

import { showDataError } from './utils.js';

// загружаем данные, отрисовываем миниатюры, создаем модальное окно
getData()
  .then((array) => {
    getMiniatures(array);
    setFullscale(array);
  })
  .catch(showDataError);
