// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const createCard = (name, link, deleteCard) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    return cardElement;
}

const deleteCard = (cardElement) => {
    cardElement.remove();
}

const cardsElements = initialCards.map(initialCard => createCard(initialCard.name, initialCard.link, deleteCard));

cardsContainer.append(...cardsElements);