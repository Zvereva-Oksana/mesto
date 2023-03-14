import {initialCard, initObj} from './constants.js';
import {toggleButtonState, enableValidation} from './validate.js'

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
const popupArray = document.querySelectorAll('.popup');
const buttonClose = document.querySelectorAll('.popup__close-icon');

const openPopup = (popup) => {
    const inputList = popup.querySelectorAll('.popup__input');
    const errorTextElement = popup.querySelectorAll('.popup__input-error');
    const popupButton = popup.querySelector('.popup__button')
    popup.classList.add('popup_opened');
    inputList.forEach((input) => {
        input.textContent = '';
        input.classList.remove('popup__input_invalid');
    });
    errorTextElement.forEach((item) => {
        item.classList.remove('popup__input-error_visible');
    });
    popupButton && toggleButtonState(popupButton, 'popup__button_disabled', inputList);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const openPopupAddCard = () => {
    formPopupAddCard.reset();
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
    const card = createCard(newCardOnPage)
    renderInitialCard(card);
    closePopup(popupAddCard);
}

const openPopupEditProfile = () => {
    nameInputPopupProfile.value = nameProfile.innerHTML;
    jobInputPopupProfile.value = jobProfile.innerHTML;
    openPopup(popupEditProfile)
}

const submitEditProfileForm = (event) => {
    event.preventDefault();
    nameProfile.textContent = nameInputPopupProfile.value;
    jobProfile.textContent = jobInputPopupProfile.value;
    closePopup(popupEditProfile);
}

formPopupEditProfile.addEventListener('submit', (event) => submitEditProfileForm(event));

buttonClose.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup))
})
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

buttonEditProfile.addEventListener('click', openPopupEditProfile);

formPopupAddCard.addEventListener('submit', addCard);

document.addEventListener('keydown', (event) => {
    popupArray.forEach((popup) => {
        if (event.key === 'Escape') {
            closePopup(popup)
        }
    })
})

cardViewport.addEventListener('click', (event) => {
    if (event.target.classList.contains('card__vector')) {
        event.target.classList.toggle('card__vector_active');
    }
    if (event.target.classList.contains('card__delete')) {
        event.target.closest('.card').remove();
    }
    if (event.target.classList.contains('card__mask')) {
        openPicturePopup(event)
    }
})

document.addEventListener('click', (event) => {
    popupArray.forEach((popup) => {
        if (event.target.classList.contains('popup')) {
            closePopup(popup)
        }
    })
})

initialCard.map((item) => createCard(item)).map((item) => renderInitialCard(item));

enableValidation(initObj);






