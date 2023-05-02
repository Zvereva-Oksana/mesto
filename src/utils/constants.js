export const initObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: '.popup__input-error_type_',
    errorClass: 'popup__input-error_visible',
    errorField: 'popup__input-error_all-field',
    underlineMisspelledField: 'popup__input_invalid'
}

const buttonOpenEditProfile = document.querySelector('.profile__button-edit');
const formPopupEditProfile = document.querySelector('.popup__form_edit-profile');
const formPopupAddCard = document.querySelector('.popup__form_add-card');
const formPopupEditAvatar = document.querySelector('.popup__form_edit-avatar');
const buttonOpenPopupAddCard = document.querySelector('.profile__button-add');
const cardListSelector = '.element';
const template = '.template';
const nameSelector = '.profile__name';
const jobSelector = '.profile__job';
const avatarSelector = '.profile__avatar'
const avatar = document.querySelector(avatarSelector);
export { buttonOpenEditProfile,
    formPopupEditProfile,
    formPopupAddCard,
    formPopupEditAvatar,
    buttonOpenPopupAddCard,
    cardListSelector,
    template,
    nameSelector,
    jobSelector,
    avatarSelector,
    avatar
}