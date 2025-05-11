import { apiDeleteCard, likeCard, unlikeCard } from './api.js'


const cardTemplate = document.querySelector('#card-template').content;

//=================== Функция удаления карточки ========================================
function handleDeleteCard (cardId, cardElement) {
  apiDeleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error('Ошибка при удалении карточки: ', err))
};


//=================== Функция лайка карточки ========================================
const handleLikeCard = (cardId, likeButton, likeCountElement) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const apiCall = isLiked ? unlikeCard(cardId) : likeCard(cardId);
  
  apiCall
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCountElement.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.error('Ошибка при лайке карточки: ', err))
};


//=================== Функция создания карточки ========================================
function createCard(cardData, userId, onDelete, onLike, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.number-of-likes');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCountElement.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  deleteButton.addEventListener('click', () => onDelete(cardData._id, cardElement));
  likeButton.addEventListener('click', () => onLike(cardData._id, likeButton, likeCountElement));
  cardImage.addEventListener('click', () => onImageClick(cardData.name, cardData.link));

  

  if (cardData.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}

export { createCard, handleDeleteCard, handleLikeCard };