// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу



const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

const createCard = (name, link) => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
    });

    // cardList.append(cardElement); так тоже работало, но по заданию вывод карточки на страницу в конце (по карйней мере я так понял задание)

    return cardElement;
}

const deleteCard = (cardElement) => {
    cardElement.remove();
}

const cardsElements = initialCards.map(initialCard => createCard(initialCard.name, initialCard.link));


cardList.append(...cardsElements);