import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, cardLike } from './blocks/components/card.js';
import { openModal, closeModal, openImagePopup } from './blocks/components/modal.js';
import './pages/index.css';


const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const newPlaceForm = document.querySelector('.popup_type_new-card .popup__form');
const placeNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');

const cardsContainer = document.querySelector('.places__list');


// ================== Обработка открытия, закрытия попапов ================================

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

addCardButton.addEventListener('click', () => openModal(popupNewCard));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  });

  popup.classList.add('popup_is-animated');
});


// ================== Редактирование профиля ================================

function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const name = nameInput.value;
  const description = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit);


// ================ Добавление карточки ===========================

function addCard(evt) {
  evt.preventDefault();

  const newCard = {
    name:placeNameInput.value,
    link:linkInput.value
  };

  const cardElement = createCard(newCard.name, newCard.link, deleteCard, cardLike, openImagePopup);
  cardsContainer.prepend(cardElement);

  newPlaceForm.reset();
  closeModal(popupNewCard);
}

newPlaceForm.addEventListener('submit', addCard);

//==========================================================

const cardsElements = initialCards.map(initialCard => createCard(initialCard.name, initialCard.link, deleteCard, cardLike, openImagePopup));

cardsContainer.append(...cardsElements);

