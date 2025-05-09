import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, cardLike } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import './pages/index.css';

//======================== DOM-элементы: кнопки и попапы ==========================================

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

// -------------------- Попапы ---------------
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popup = document.querySelector('.popup_type_image');

// -------------------- Элементы профиля ---------------
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// -------------------- Форма редактирования профиля ---------------
const profileFormElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

// -------------------- Форма добавления новых карточек ---------------
const newPlaceForm = document.querySelector('.popup_type_new-card .popup__form');
const placeNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const linkInput = newPlaceForm.querySelector('.popup__input_type_url');

// -------------------- Элементы попапа открытия большого изображения ---------------

const popupImage = popup.querySelector('.popup__image');
const popupCaption = popup.querySelector('.popup__caption');

// -------------------- Контейнер для карточек ---------------
const cardsContainer = document.querySelector('.places__list');


// ================== Обработка открытия, закрытия попапов ================================

profileEditButton.addEventListener('click', openEditProfilePopup);

addCardButton.addEventListener('click', openNewPlacePopup);


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

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 

  const name = nameInput.value;
  const description = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;

  closeModal(popupEdit);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


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

//================== Обработчик открытия попапа большлго изображения ========================================

function openImagePopup(name, link) {

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popup);
}

//==========================================================

const cardsElements = initialCards.map(initialCard => createCard(initialCard.name, initialCard.link, deleteCard, cardLike, openImagePopup));

cardsContainer.append(...cardsElements);

//============================================================================================
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function openEditProfilePopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileFormElement, validationConfig);
  openModal(popupEdit);
}

function openNewPlacePopup() {
  newPlaceForm.reset();
  clearValidation(newPlaceForm, validationConfig);
  openModal(popupNewCard);
}

enableValidation(validationConfig);