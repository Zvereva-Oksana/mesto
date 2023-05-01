import './index.css';
import {initObj} from '../utils/constants.js';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js'
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"

const buttonOpenEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const formPopupEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const formPopupAddCard = document.querySelector('.popup__form_add-card');
const formPopupEditAvatar = document.querySelector('.popup__form_edit-avatar');
const buttonOpenPopupAddCard = document.querySelector('.profile__button-add');
const cardListSelector = '.element';
const template = '.template';
const nameSelector = '.profile__name';
const jobSelector = '.profile__job';
const avatarSelector = '.profile__avatar'
const avatar = document.querySelector(avatarSelector);
let userId;

const formPopupEditProfileValidator = new FormValidator(initObj, formPopupEditProfile);
const formPopupAddCardValidator = new FormValidator(initObj, formPopupAddCard);
const formPopupEditAvatarValidator = new FormValidator(initObj, formPopupEditAvatar);
const popupAddCard = new Popup('.popup_add-card')
const editProfilePopup = new Popup('.popup_edit-profile')
const popupPicture = new PopupWithImage('.picture-popup');
const userInfo = new UserInfo({nameSelector, jobSelector, avatarSelector});
const popupDeleteCard = new PopupWithConfirmation('.popup_delete-card')
formPopupAddCardValidator.enableValidation();
formPopupEditProfileValidator.enableValidation();
formPopupEditAvatarValidator.enableValidation();
popupPicture.setEventListeners();
popupDeleteCard.setEventListeners();

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: '7ff098a0-f867-4f2f-af72-c15adfdb3347',
        'Content-Type': 'application/json'
    }
});

api.getUserInfo().then((dataUser) => {
    userInfo.setUserInfo({userName: dataUser.name, userJob: dataUser.about});
    userInfo.setUserAvatar(dataUser.avatar);
    userId = dataUser['_id'];
    api.getInitialCards().then((dataCard) => {
        cardsList.renderItems(dataCard)
    })
}).catch((err) => {
    console.error(err);
})

const createCard = (cardInfo) => {
    const card = new Card(cardInfo, template,
        () =>
            popupPicture.open(cardInfo.name, cardInfo.link), userId,
        (event) => {
            popupDeleteCard.open()
            const cardElement = event.target.closest('.card');
            popupDeleteCard.handlerDeleteCard(() => {
                const cardId = card.getCardId();
                api.deleteCard(cardId).then(() => {
                    cardElement.remove();
                    popupDeleteCard.close();
                }).catch((err) => {
                    console.error(err);
                });
            });
        },
        () => {
            const cardId = card.getCardId();
            api.addLikeCard(cardId).then((data) => {
                card.initLike(data)
                card.likesNumber(data)
                card.setLike()
            }).catch((err) => {
                console.error(err);
            });
        },
        () => {
            const cardId = card.getCardId();
            api.deleteLikeCard(cardId).then((data) => {
                card.likesNumber(data)
                card.initLike(data)
                card.deleteLike()
            }).catch((err) => {
                console.error(err);
            });
        })
    return card.generateCard();
}
const cardsList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addItem(cardElement)
    }
}, cardListSelector)

const openPopupAddCard = () => {
    formPopupAddCard.reset();
    formPopupAddCardValidator.setInitialStateForm()
    popupAddCard.open();
}
const popupWithFormAddCard = new PopupWithForm('.popup_add-card',
    (event, data) => {
        event.preventDefault();
        const cardData = {...data, name: data.place};
        api.addNewCard(cardData).then((cardInfo) => {
            cardsList.addItem(createCard(cardInfo))
            popupWithFormAddCard.close();
        }).catch((err) => {
            console.error(err);
        })
    });
popupWithFormAddCard.setEventListeners();
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

const popupWithFormEditProfile = new PopupWithForm('.popup_edit-profile', (event) => {
    event.preventDefault();
    popupWithFormEditProfile.renderLoading(true)
    const userFormValue = popupWithFormEditProfile.getFormValue();
    api.addInfoUser({name: userFormValue.name, about: userFormValue.job}).then((data) => {
        userInfo.setUserInfo({userName: data.name, userJob: data.about});
        popupWithFormEditProfile.close();
    }).catch((err) => {
        console.error(err);
    })
});
popupWithFormEditProfile.setEventListeners();
buttonOpenEditProfile.addEventListener('click', () => {
    popupWithFormEditProfile.renderLoading(false)
    const userInfoData = userInfo.getUserInfo();
    const profileForm = popupWithFormEditProfile.getFormElement();
    profileForm.elements.name.value = userInfoData.userName;
    profileForm.elements.job.value = userInfoData.userJob;
    formPopupEditProfileValidator.setInitialStateForm()
    editProfilePopup.open()
});

const popupWithFormEditAvatar = new PopupWithForm('.popup_edit-avatar', (event, valueForm) => {
    event.preventDefault();
    popupWithFormEditAvatar.renderLoading(true)
    api.editUserAvatar(valueForm).then(({avatar}) => {
        popupWithFormEditAvatar.close();
        userInfo.setUserAvatar(avatar);
    }).catch((err) => {
        console.error(err);
    })
});
popupWithFormEditAvatar.setEventListeners();
const openPopupEditAvatar = () => {
    popupWithFormEditAvatar.renderLoading(false)
    formPopupEditAvatar.reset();
    formPopupEditAvatarValidator.setInitialStateForm();
    popupWithFormEditAvatar.open()
}
avatar.addEventListener('click', openPopupEditAvatar);
