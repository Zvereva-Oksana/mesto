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
const formPopupEditProfileValidator = new FormValidator(initObj, formPopupEditProfile);
const formPopupAddCardValidator = new FormValidator(initObj, formPopupAddCard);

export const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (event) => closePopupEsc(event, popup));
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event) => closePopupEsc(event, popup));
}

const openPopupAddCard = () => {
    formPopupAddCard.reset();
    openPopup(popupAddCard);
    formPopupAddCardValidator.enableValidation();
}

initialCard.forEach(({name, link}) => {
    const card = new Card(name, link);
    const cardElement = card.generateCard();
    cardViewport.append(cardElement);
});

const renderInitialCard = (card) => {
    cardViewport.prepend(card);
}

const addCard = (event) => {
    event.preventDefault();
    const name = placeInputPopupAddCard.value;
    const link = linkInputPopupAddCard.value;
    const card = new Card(name, link).generateCard();
    renderInitialCard(card);
    closePopup(popupAddCard);
}

const openPopupEditProfile = () => {
    nameInputPopupProfile.value = nameProfile.textContent;
    jobInputPopupProfile.value = jobProfile.textContent;
    openPopup(popupEditProfile);
    formPopupEditProfileValidator.enableValidation();
}

const submitEditProfileForm = (event) => {
    event.preventDefault();
    nameProfile.textContent = nameInputPopupProfile.value;
    jobProfile.textContent = jobInputPopupProfile.value;
    closePopup(popupEditProfile);
}

const closePopupEsc = (event, popup) => {
    if (event.key === 'Escape') {
        closePopup(popup)
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

