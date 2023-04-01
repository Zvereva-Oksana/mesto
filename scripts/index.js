import {initialCard, initObj} from './constants.js';
import Card from "./Card.js";
import FormValidator from './FormValidator.js'

const buttonEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const nameInputPopupProfile = formPopupEditProfile.querySelector('.popup__input_type_name');
const jobInputPopupProfile = formPopupEditProfile.querySelector('.popup__input_type_job');
const popupAddCard = document.querySelector('.popup_add-card');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const formPopupAddCard = document.querySelector('.popup__form_add-card');
const placeInputPopupAddCard = formPopupAddCard.querySelector('.popup__input_type_place');
const linkInputPopupAddCard = formPopupAddCard.querySelector('.popup__input_type_link');
const buttonOpenPopupAddCard = document.querySelector('.profile__button-add');
const cardViewport = document.querySelector('.element');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupPicture = document.querySelector('.picture-popup');
const screensaverPopupPicture = popupPicture.querySelector('.picture-popup__img');

const formPopupEditProfileValidator = new FormValidator(initObj, formPopupEditProfile);
formPopupEditProfileValidator.enableValidation();

const formPopupAddCardValidator = new FormValidator(initObj, formPopupAddCard);
formPopupAddCardValidator.enableValidation();

const template = '.template';

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
}

const openPopupAddCard = () => {
    formPopupAddCard.reset();
    formPopupAddCardValidator.setInitialStateForm()
    openPopup(popupAddCard);
}

const createCard = (cardInfo) => {
    const card = new Card(cardInfo, template);
    return card.generateCard();
}

initialCard.forEach((card) => {
    cardViewport.append(createCard(card));
});

const renderNewCard = (cardElement) => {
    cardViewport.prepend(cardElement);
}

const addCard = (event) => {
    event.preventDefault();
    const cardInfo = {
        name: placeInputPopupAddCard.value,
        link: linkInputPopupAddCard.value
    }
    renderNewCard(createCard(cardInfo));
    closePopup(popupAddCard);
}

export const handleOpenPopup = (imgLink, imgName) => {
    screensaverPopupPicture.src = imgLink;
    screensaverPopupPicture.alt = imgName;
    popupPicture.querySelector('.picture-popup__figcaption').textContent = imgName;
    openPopup(popupPicture);
}

const openPopupEditProfile = () => {
    nameInputPopupProfile.value = nameProfile.textContent;
    jobInputPopupProfile.value = jobProfile.textContent;
    formPopupEditProfileValidator.setInitialStateForm();
    openPopup(popupEditProfile);
}

const submitEditProfileForm = (event) => {
    event.preventDefault();
    nameProfile.textContent = nameInputPopupProfile.value;
    jobProfile.textContent = jobInputPopupProfile.value;
    closePopup(popupEditProfile);
}

const closePopupEsc = (event) => {
    if (event.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

const closePopupByOverlayAndCloseIcon = (event, popup) => {
    if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-icon')) {
        closePopup(popup)
    }
}

formPopupEditProfile.addEventListener('submit', (event) => submitEditProfileForm(event));

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

buttonEditProfile.addEventListener('click', openPopupEditProfile);

formPopupAddCard.addEventListener('submit', addCard);

formPopupEditProfile.addEventListener('submit', (event) => submitEditProfileForm(event));

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => closePopupByOverlayAndCloseIcon(evt, popup))
})

