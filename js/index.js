const openPopup = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__close-icon_action');
const modalWindowPopup = document.querySelector('.popup');
const namePage = document.querySelector('.profile__name_type');
const jobPage = document.querySelector('.profile__job_type');
const nameFormPopupInput = document.querySelector('.popup__item_how-heading');
const jobFormPopupInput = document.querySelector('.popup__item_how-subheading');
const formElement = document.querySelector('.popup__form-container_text');

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