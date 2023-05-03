import './index.css';
import {initObj} from '../utils/constants.js';
import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js'
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js"
import PopupWithConfirmation from "../components/PopupWithConfirmation.js"

import {
    buttonOpenEditProfile,
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
} from '../utils/constants.js'

let userId;

const formPopupEditProfileValidator = new FormValidator(initObj, formPopupEditProfile);
const formPopupAddCardValidator = new FormValidator(initObj, formPopupAddCard);
const formPopupEditAvatarValidator = new FormValidator(initObj, formPopupEditAvatar);
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([dataUser, dataCard]) => {
        userInfo.setUserInfo({userName: dataUser.name, userJob: dataUser.about});
        userInfo.setUserAvatar(dataUser.avatar);
        userId = dataUser['_id'];
        cardsList.renderCards(dataCard)
    })
    .catch((err) => {
        console.log(err)
    });

const createCard = (cardInfo) => {
    const card = new Card(cardInfo, template,
        () =>
            popupPicture.open(cardInfo.name, cardInfo.link), userId,
        (event) => {
            popupDeleteCard.open()
            const cardElement = event.target.closest('.card');
            popupDeleteCard.confirmCardDeletion(() => {
                const cardId = card.getCardId();
                api.deleteCard(cardId).then(() => {
                    cardElement.remove();
                    popupDeleteCard.close();
                }).catch((err) => {
                    console.log(err)
                })
            })
        },
        () => {
            const cardId = card.getCardId();
            api.addLikeCard(cardId).then((data) => {
                card.setCountLikes(data)
                card.renderCountLikesByCard(data)
                card.addLikeOnCard()
            }).catch((err) => {
                console.log(err)
            })
        },
        () => {
            const cardId = card.getCardId();
            api.deleteLikeCard(cardId).then((data) => {
                card.renderCountLikesByCard(data)
                card.setCountLikes(data)
                card.removeLikeOnCard()
            }).catch((err) => {
                console.log(err)
            })
        })
    return card.generateCard();
}
const cardsList = new Section({
    renderer: (item) => {
        const cardElement = createCard(item);
        cardsList.addCard(cardElement)
    }
}, cardListSelector)

const popupWithFormAddCard = new PopupWithForm('.popup_add-card',
    (event, data) => {
        event.preventDefault();
        popupWithFormAddCard.renderLoading(true);
        const cardData = {...data, name: data.place};
        api.addNewCard(cardData).then((cardInfo) => {
            cardsList.addCard(createCard(cardInfo))
            popupWithFormAddCard.close();
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setTimeout(() => popupWithFormAddCard.renderLoading(false), 500)
        })
    });
popupWithFormAddCard.setEventListeners();

const openPopupAddCard = () => {
    formPopupAddCardValidator.setInitialStateForm()
    popupWithFormAddCard.open();
}
buttonOpenPopupAddCard.addEventListener('click', openPopupAddCard);

const popupWithFormEditProfile = new PopupWithForm('.popup_edit-profile', (event) => {
    event.preventDefault();
    popupWithFormEditProfile.renderLoading(true)
    const userFormValue = popupWithFormEditProfile.getFormValue();
    api.addInfoUser({name: userFormValue.name, about: userFormValue.job}).then((data) => {
        userInfo.setUserInfo({userName: data.name, userJob: data.about});
        popupWithFormEditProfile.close();
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        setTimeout(() => popupWithFormEditProfile.renderLoading(false), 500)
    })
});
popupWithFormEditProfile.setEventListeners();
buttonOpenEditProfile.addEventListener('click', () => {
    const userInfoData = userInfo.getUserInfo();
    const profileForm = popupWithFormEditProfile.getFormElement();
    profileForm.elements.name.value = userInfoData.userName;
    profileForm.elements.job.value = userInfoData.userJob;
    formPopupEditProfileValidator.setInitialStateForm()
    popupWithFormEditProfile.open()
});

const popupWithFormEditAvatar = new PopupWithForm('.popup_edit-avatar', (event, valueForm) => {
    event.preventDefault();
    popupWithFormEditAvatar.renderLoading(true)
    api.editUserAvatar(valueForm).then(({avatar}) => {
        popupWithFormEditAvatar.close();
        userInfo.setUserAvatar(avatar);
    }).catch((err) => {
        console.log(err)
    }).finally(() => {
        setTimeout(() => popupWithFormEditAvatar.renderLoading(false), 500)
    })
});
popupWithFormEditAvatar.setEventListeners();
const openPopupEditAvatar = () => {
    formPopupEditAvatarValidator.setInitialStateForm();
    popupWithFormEditAvatar.open()
}
avatar.addEventListener('click', openPopupEditAvatar);
