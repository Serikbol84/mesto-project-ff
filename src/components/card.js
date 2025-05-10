
// const cardTemplate = document.querySelector('#card-template').content;


// const createCard = (name, link, deleteCard, cardLike, openImagePopup) => {
//   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

//   const cardImage = cardElement.querySelector('.card__image');
//   const cardTitle = cardElement.querySelector('.card__title');
//   const deleteButton = cardElement.querySelector('.card__delete-button');

//   const cardLikeButton = cardElement.querySelector('.card__like-button');

//   cardImage.src = link;
//   cardImage.alt = name;
//   cardTitle.textContent = name;

//   deleteButton.addEventListener('click', () => deleteCard(cardElement));
//   cardLikeButton.addEventListener('click', cardLike);
//   cardImage.addEventListener('click', () => openImagePopup(name, link));

//   return cardElement;
// }

// const deleteCard = (cardElement) => {
//   cardElement.remove();
// }

// function cardLike(event) {
//     event.target.classList.toggle('card__like-button_is-active');
// }



//   export { createCard, deleteCard, cardLike };

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardData, userId, onDelete, onLike, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.number-of-likes');

  // Установка данных карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  // Обработчики событий
  deleteButton.addEventListener('click', () => onDelete(cardData._id, cardElement));
  likeButton.addEventListener('click', () => onLike(cardData._id, likeButton, likeCountElement));
  cardImage.addEventListener('click', () => onImageClick(cardData.name, cardData.link));

  // Проверяем, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

export { createCard };