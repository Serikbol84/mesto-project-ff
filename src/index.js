
import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import './pages/index.css';

import {   
  getUserInfo,
  updateUserInfo,
  getInitialCards,
  addCard,
  updateAvatar,
  apiDeleteCard,
  likeCard,
  unlikeCard    
} from './components/api.js';

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

//--------------------- Форма аватара -----------------------------

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const formEditAvatar = document.forms['edit-avatar'];
const avatarInput = formEditAvatar.elements.avatar;
const profileAvatar = document.querySelector('.profile__image');

// -------------------- Контейнер для карточек ---------------
const cardsContainer = document.querySelector('.places__list');



// ================== Получеие данных с API ========================================
let userId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cardList]) => {
    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    const cardsElements = cardList.map(card => 
      createCard(card, userId, handleDeleteCard, handleLikeCard, openImagePopup)
    );
    cardsContainer.append(...cardsElements);
  })

.catch((err) => console.error('Ошибка при загрузке данных: ', err));

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

  const saveButton = evt.submitter;
  const originalText = saveButton.textContent;
  
  saveButton.textContent = 'Сохранение...';

  updateUserInfo(nameInput.value, jobInput.value  )
  .then((userData) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    closeModal(popupEdit);
  })

  .catch((err) => console.error('Ошибка при обновлении профиля: ', err))
  .finally(() => {
    saveButton.disabled = false;
    saveButton.textContent = originalText;
  });
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);


// ================ Добавление карточки ===========================

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const saveButton = evt.submitter;
  const originalText = saveButton.textContent;
  
  saveButton.textContent = 'Создание...';


  addCard(placeNameInput.value, linkInput.value)
    .then((cardData) => {
      const cardElement = createCard(
        cardData,
        userId,
        handleDeleteCard,
        handleLikeCard,
        openImagePopup
      );
      cardsContainer.prepend(cardElement);
      newPlaceForm.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => console.error('Ошибка при добавлении карточки: ', err))
    .finally(() => {
      saveButton.disabled = false;
      saveButton.textContent = originalText;
    });
}

newPlaceForm.addEventListener('submit', handleAddCardSubmit);

//=================== Удаление карточки ========================================

const handleDeleteCard = (cardId, cardElement) => {
  apiDeleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.error('Ошибка при удалении карточки: ', err))
};

//=================== Лайк карточки ========================================
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

//================== Обработчик открытия попапа большлго изображения ========================================

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popup);
}

// ================== Обработчик аватара =================================

profileAvatar.addEventListener('click', () => {
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});

formEditAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const saveButton = evt.submitter;
  
  saveButton.textContent = 'Сохранение...';
  updateAvatar(avatarInput.value)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(popupEditAvatar);
    })
    .catch(console.error)
    .finally(() => {
      saveButton.textContent = 'Сохранить';
    });
});

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





