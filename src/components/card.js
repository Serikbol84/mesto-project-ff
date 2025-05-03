
const cardTemplate = document.querySelector('#card-template').content;


const createCard = (name, link, deleteCard, cardLike, openImagePopup) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardLikeButton.addEventListener('click', cardLike);
  cardImage.addEventListener('click', () => openImagePopup(name, link));

  return cardElement;
}

const deleteCard = (cardElement) => {
  cardElement.remove();
}

function cardLike(event) {
    event.target.classList.toggle('card__like-button_is-active');
}



export { createCard, deleteCard, cardLike };