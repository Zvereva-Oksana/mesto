import {INITIAL_CARD, USER, PLACE, USER_FORM, PLACE_FORM} from './constants.js'

const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__close-icon');
const modalWindowPopup = document.querySelector('.popup');
const namePage = document.querySelector('.profile__name');
const jobPage = document.querySelector('.profile__job');
const nameFormPopupInput = document.querySelector('.popup__item_type_name');
const jobFormPopupInput = document.querySelector('.popup__item_type_job');
const formElement = document.querySelector('.popup__form-container');
const openPopupCard = document.querySelector('.profile__button-add');
const headerPopup = document.querySelector('.popup__heading');
const saveButton = document.querySelector('.popup__button-save');
const openPicturePopup = document.querySelector('.picture-popup');
const cardPage = document.querySelector('.element');
const closePicturePopup = document.querySelector('.picture-popup__close-icon');

const initializeModalWindow = (typeObject) => {
    modalWindowPopup.classList.add('popup_opened');
    nameFormPopupInput.value = typeObject === USER_FORM ? namePage.innerHTML : '';
    jobFormPopupInput.value = typeObject === USER_FORM ? jobPage.innerHTML : '';
    const obj = typeObject === USER_FORM ? USER : PLACE;
    headerPopup.textContent = obj.header;
    saveButton.textContent = obj.button;
    nameFormPopupInput.setAttribute('placeholder', obj.name_placeholder);
    jobFormPopupInput.setAttribute('placeholder', obj.job_placeholder);
}

const closeModalWindow = () => {
    modalWindowPopup.classList.remove('popup_opened');
}

const addingCardOnPage = (card) => {
    const cardTemplate = document.querySelector('.templateCard').content.cloneNode(true);
    const cardName = cardTemplate.querySelector('.card__name');
    cardName.textContent = card.name;
    const cardImage = cardTemplate.querySelector('.card__mask');
    cardImage.setAttribute('src', card.link);
    cardImage.setAttribute('alt', card.name);
    cardPage.prepend(cardTemplate);

    cardImage.addEventListener('click', (event) => {
        const imgSrc = event.target.currentSrc;
        const img = document.querySelector('.picture-popup__img')
        img.setAttribute('src', imgSrc);
        openPicturePopup.classList.add('picture-popup_opened');
        const cardTarget = event.target.closest('.card');
        const cardName = cardTarget.querySelector('.card__name').innerHTML;
        const cardNamePopup = document.querySelector('.picture-popup__figcaption');
        cardNamePopup.textContent = cardName;
    })

    const buttonLike = cardPage.querySelector('.card__vector');
    buttonLike.addEventListener('click', (event) => {
        event.target.classList.toggle('card__vector_active');
    })

    const cardButtonDelete = cardPage.querySelector('.card__delete');
    cardButtonDelete.addEventListener('click', (event) => {
            event.target.closest('.card').remove();
        }
    )
}

const closePictureModalWindow = () => {
    openPicturePopup.classList.remove('picture-popup_opened');
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    saveButton.innerHTML === 'Сохранить' ? createUserFromForm() : addingNewCardToExistingOnes(event);
    closeModalWindow();
}

const createUserFromForm = () => {
    namePage.textContent = nameFormPopupInput.value;
    jobPage.textContent = jobFormPopupInput.value;
}

const addingNewCardToExistingOnes = (event) => {
    const name = event.target.querySelector('.popup__item_type_name').value;
    const link = event.target.querySelector('.popup__item_type_job').value;
    const card = {
        link: link,
        name: name,
    }
    addingCardOnPage(card);
}

openPopup.addEventListener('click', () => initializeModalWindow(USER_FORM));
openPopupCard.addEventListener('click', () => initializeModalWindow(PLACE_FORM));
closePopup.addEventListener('click', closeModalWindow);
closePicturePopup.addEventListener('click', closePictureModalWindow);
formElement.addEventListener('submit', handleFormSubmit);

document.addEventListener('animationstart', function (e) {
    if (e.animationName === 'appearance') {
        e.target.classList.add('closing-delay');
    }
});

document.addEventListener('animationend', function (e) {
    if (e.animationName === 'disappearance') {
        e.target.classList.remove('closing-delay');
    }
});

INITIAL_CARD.forEach((item) => addingCardOnPage(item));








