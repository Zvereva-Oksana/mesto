const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__close-icon');
const modalWindowPopup = document.querySelector('.popup');
const namePage = document.querySelector('.profile__name');
const jobPage = document.querySelector('.profile__job');
const nameFormPopupInput = document.querySelector('.popup__item_type_name');
const jobFormPopupInput = document.querySelector('.popup__item_type_job');
const formElement = document.querySelector('.popup__form-container');

const closeModalWindow = () => {
    modalWindowPopup.classList.remove('popup_opened');
}

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    namePage.textContent = nameFormPopupInput.value;
    jobPage.textContent = jobFormPopupInput.value;
    closeModalWindow();
}

openPopup.addEventListener('click', () => {
        modalWindowPopup.classList.add('popup_opened');
        nameFormPopupInput.value = namePage.innerHTML;
        jobFormPopupInput.value = jobPage.innerHTML;
    }
)

closePopup.addEventListener('click', closeModalWindow);

formElement.addEventListener('submit', handleFormSubmit);

