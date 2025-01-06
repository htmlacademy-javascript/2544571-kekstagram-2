// Находим необходимые элементы в разметке, создаем массив картинок и фрагмент
const genPicturesContainer = document.querySelector('.pictures');
const genPictureTemplate = document.querySelector('#picture').content;
const genPicturesFragment = document.createDocumentFragment();

function getMiniatures(array) {
  // Используем forEach для переноса данных из массива в подготовленный фрагмент
  array.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = genPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').dataset.pictureId = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    genPicturesFragment.appendChild(pictureElement);
  });

  // Добавляем фрагмент в разметку
  genPicturesContainer.appendChild(genPicturesFragment);

}

export { getMiniatures };
