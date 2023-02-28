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

const controlModal = (element, classNameAdd, classNameRemove) => {
    element.classList.add(classNameAdd);
    element.classList.remove(classNameRemove);
}

const openPopupAddCard = () => {
    controlModal(popupAddCard, 'popup_opened', 'popup_close');
    placeInputPopupAddCard.value = '';
    linkInputPopupAddCard.value = '';
}

const openPicturePopup = (event) => {
    const srcSelectedImage = event.target.currentSrc;
    imgPopup.setAttribute('src', srcSelectedImage);
    controlModal(popupPicture, 'picture-popup_opened', 'picture-popup_close');
    const cardTarget = event.target.closest('.card');
    const nameImg = cardTarget.querySelector('.card__name');
    figcaptionPopup.textContent = nameImg.innerHTML;
    imgPopup.setAttribute('alt', nameImg.innerHTML);
}

const renderInitialCards = (card) => {
    const templateCardContent = templateCard.cloneNode(true);
    const nameCard = templateCardContent.querySelector('.card__name');
    nameCard.textContent = card.name;
    const pictureCard = templateCardContent.querySelector('.card__mask');
    pictureCard.setAttribute('src', card.link);
    pictureCard.setAttribute('alt', card.name);
    cardViewport.prepend(templateCardContent);

    const buttonDeleteCardOnPage = cardViewport.querySelector('.card__delete');
    buttonDeleteCardOnPage.addEventListener('click', (event) => {
        event.target.closest('.card').remove();
    })
    const buttonLikeCard = cardViewport.querySelector('.card__vector');
    buttonLikeCard.addEventListener('click', (event) => {
        event.target.classList.toggle('card__vector_active');
    })
    pictureCard.addEventListener('click', (event) => openPicturePopup(event));

    buttonClosePopupPicture.addEventListener('click', () => {
        controlModal(popupPicture, 'picture-popup_close', 'picture-popup_opened');
    })

    buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);
}

const addCard = (event) => {
    event.preventDefault();
    const name = placeInputPopupAddCard.value;
    const link = linkInputPopupAddCard.value;
    const newCardOnPage = {name, link};
    renderInitialCards(newCardOnPage);
    controlModal(popupAddCard, 'popup_close', 'picture-popup_opened');
}

const openPopupEditProfile = () => {
    controlModal(popupEditProfile, 'popup_opened', 'popup_close');
    nameInputPopupProfile.value = nameProfile.innerHTML;
    jobInputPopupProfile.value = jobProfile.innerHTML;
}

const submitEditProfileForm = (event) => {
    event.preventDefault();
    nameProfile.textContent = nameInputPopupProfile.value;
    jobProfile.textContent = jobInputPopupProfile.value;
    controlModal(popupEditProfile, 'popup_close', 'popup_opened');
}

formPopupEditProfile.addEventListener('submit', (event) => submitEditProfileForm(event));

buttonCloseProfilePopup.addEventListener('click', () => {
    controlModal(popupEditProfile, 'popup_close', 'popup_opened');
})

buttonEditProfile.addEventListener('click', openPopupEditProfile);
formPopupAddCard.addEventListener('submit', addCard);
buttonCloseCardPopup.addEventListener('click', () => {
    controlModal(popupAddCard, 'popup_close', 'popup_opened');
})

initialCard.forEach((item) => renderInitialCards(item));










