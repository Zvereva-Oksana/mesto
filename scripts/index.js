import {initialCard, initObj} from './constants.js';
import {enableValidation, hideInputError, disabledButton, enableButton} from './validate.js'

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
const popupPicture = document.querySelector('.picture-popup');
const imgPopup = popupPicture.querySelector('.picture-popup__img');
const figcaptionPopup = popupPicture.querySelector('.picture-popup__figcaption');
const cardViewport = document.querySelector('.element');
const templateCard = cardViewport.querySelector('.template').content;
const popups = Array.from(document.querySelectorAll('.popup'));

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', (event) => closePopupEsc(event, popup));
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event) => closePopupEsc(event, popup));
}

const openPopupAddCard = () => {
    const submitButton = popupAddCard.querySelector('.popup__button');
    disabledButton(submitButton, 'popup__button_disabled')
    formPopupAddCard.reset();
    clearErrorsMessage(popupAddCard);
    openPopup(popupAddCard);
}

const openPicturePopup = (event) => {
    const srcSelectedImage = event.target.currentSrc;
    imgPopup.setAttribute('src', srcSelectedImage);
    openPopup(popupPicture);
    const cardTarget = event.target.closest('.card');
    const nameImg = cardTarget.querySelector('.card__name');
    figcaptionPopup.textContent = nameImg.innerHTML;
    imgPopup.setAttribute('alt', nameImg.innerHTML);
}

const createCard = (card) => {
    const templateCardContent = templateCard.cloneNode(true);
    const nameCard = templateCardContent.querySelector('.card__name');
    nameCard.textContent = card.name;
    const pictureCard = templateCardContent.querySelector('.card__mask');
    pictureCard.setAttribute('src', card.link);
    pictureCard.setAttribute('alt', card.name);
    const buttonDeleteCardOnPage = templateCardContent.querySelector('.card__delete');
    buttonDeleteCardOnPage.addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    })
    const buttonLikeCard = templateCardContent.querySelector('.card__vector');
    buttonLikeCard.addEventListener('click', (event) => {
        event.target.classList.toggle('card__vector_active');
    })
    pictureCard.addEventListener('click', (event) => openPicturePopup(event));
    return templateCardContent;
}

const renderInitialCard = (card) => {
    cardViewport.prepend(card);
}

const addCard = (event) => {
    event.preventDefault();
    const name = placeInputPopupAddCard.value;
    const link = linkInputPopupAddCard.value;
    const newCardOnPage = {name, link};
    const card = createCard(newCardOnPage);
    renderInitialCard(card);
    closePopup(popupAddCard);
}

const clearErrorsMessage = (popup) => {
    const inputList = popup.querySelectorAll('.popup__input');
    const errorTextElementList = popup.querySelectorAll('.popup__input-error_visible');
    if (errorTextElementList.length > 0) {
        errorTextElementList.forEach((errorTextElement) => {
            hideInputError(errorTextElement, 'popup__input-error_visible', inputList)
        });
    }
}

const openPopupEditProfile = () => {
    const submitButton = popupEditProfile.querySelector('.popup__button');
    enableButton(submitButton, 'popup__button_disabled')
    nameInputPopupProfile.value = nameProfile.textContent;
    jobInputPopupProfile.value = jobProfile.textContent;
    clearErrorsMessage(popupEditProfile);
    openPopup(popupEditProfile);
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

initialCard.map((item) => createCard(item)).forEach((item) => renderInitialCard(item));

enableValidation(initObj);






