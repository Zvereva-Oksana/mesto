import {initialCard} from './constants.js';

const buttonEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupEditProfile = popupEditProfile.querySelector('.popup__form-container_edit-profile');
const nameInputPopupProfile = formPopupEditProfile.querySelector('.popup__item_type_name');
const jobInputPopupProfile = formPopupEditProfile.querySelector('.popup__item_type_job');
const buttonCloseProfilePopup = popupEditProfile.querySelector('.popup__close-icon_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const buttonCloseCardPopup = popupAddCard.querySelector('.popup__close-icon_add-card');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const formPopupAddCard = document.querySelector('.popup__form-container_add-card');
const placeInputPopupAddCard = formPopupAddCard.querySelector('.popup__item_type_place');
const linkInputPopupAddCard = formPopupAddCard.querySelector('.popup__item_type_link');
const buttonOpenPopupAddCard = document.querySelector('.profile__button-add');
const popupPicture = document.querySelector('.picture-popup');
const buttonClosePopupPicture = popupPicture.querySelector('.picture-popup__close-icon');
const imgPopup = popupPicture.querySelector('.picture-popup__img');
const figcaptionPopup = popupPicture.querySelector('.picture-popup__figcaption');
const cardViewport = document.querySelector('.element');
const templateCard = cardViewport.querySelector('.template').content;

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
}

const openPopupAddCard = () => {
    openPopup(popupAddCard);
    formPopupAddCard.reset();
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
    const card = createCard(newCardOnPage)
    renderInitialCard(card);
    closePopup(popupAddCard);
}

const openPopupEditProfile = () => {
    openPopup(popupEditProfile)
    nameInputPopupProfile.value = nameProfile.innerHTML;
    jobInputPopupProfile.value = jobProfile.innerHTML;
}

const submitEditProfileForm = (event) => {
    event.preventDefault();
    nameProfile.textContent = nameInputPopupProfile.value;
    jobProfile.textContent = jobInputPopupProfile.value;
    closePopup(popupEditProfile);
}

formPopupEditProfile.addEventListener('submit', (event) => submitEditProfileForm(event));
buttonCloseProfilePopup.addEventListener('click', () => {
    closePopup(popupEditProfile);
})
buttonClosePopupPicture.addEventListener('click', () => {
    closePopup(popupPicture)
})
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
buttonEditProfile.addEventListener('click', openPopupEditProfile);
formPopupAddCard.addEventListener('submit', addCard);
buttonCloseCardPopup.addEventListener('click', () => {
    closePopup(popupAddCard);
})

initialCard.map((item)=>createCard(item)).map((item) => renderInitialCard(item));









