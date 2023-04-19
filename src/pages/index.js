import './index.css';
import {initialCard, initObj} from '../utils/constants.js';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js'
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonOpenEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const formPopupAddCard = document.querySelector('.popup__form_add-card');
const buttonOpenPopupAddCard = document.querySelector('.profile__button-add');
const cardListSelector = '.element';
const template = '.template';
const nameSelector = '.profile__name';
const jobSelector = '.profile__job';
const formPopupEditProfileValidator = new FormValidator(initObj, formPopupEditProfile);
const formPopupAddCardValidator = new FormValidator(initObj, formPopupAddCard);
const popupAddCard = new Popup('.popup_add-card')
const editProfilePopup = new Popup('.popup_edit-profile')
const popupPicture = new PopupWithImage('.picture-popup');
const userInfo = new UserInfo({nameSelector, jobSelector});
formPopupAddCardValidator.enableValidation();
formPopupEditProfileValidator.enableValidation();
popupPicture.setEventListeners();
popupAddCard.setEventListeners();
editProfilePopup.setEventListeners();

const createCard = (cardInfo) => {
    const card = new Card(cardInfo, template, () =>
        popupPicture.open(cardInfo.name, cardInfo.link));
    return card.generateCard();
}

const cardsList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item, template);
        cardsList.addItem(cardElement)
    }
}, cardListSelector)

cardsList.renderItems(initialCard);

const popupWithFormAddCard = new PopupWithForm('.popup_add-card', (event, data) => {
    event.preventDefault();
    const obj = {...data, name: data.place};
    cardsList.addItem(createCard(obj))
    popupWithFormAddCard.close();
});

popupWithFormAddCard.setEventListeners()

const openPopupAddCard = () => {
    formPopupAddCard.reset();
    formPopupAddCardValidator.setInitialStateForm()
    popupAddCard.open();
}

const popupWithFormEditProfile = new PopupWithForm('.popup_edit-profile', (event, {name, job}) => {
    event.preventDefault();
    userInfo.setUserInfo({userName: name, userJob: job});
    popupWithFormEditProfile.close();
});

popupWithFormEditProfile.setEventListeners();

buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

buttonOpenEditProfile.addEventListener('click', () => {
    const userInfoData = userInfo.getUserInfo();
    const profileForm = popupWithFormEditProfile.getFormElement();
    profileForm.elements.name.value = userInfoData.userNamePage;
    profileForm.elements.job.value = userInfoData.userJobPage;
    formPopupEditProfileValidator.setInitialStateForm()
    editProfilePopup.open()
});


