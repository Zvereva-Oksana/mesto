export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
        this._userFoto = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            userName: this._userName.textContent,
            userJob: this._userJob.textContent,
        }
    }

    setUserInfo({userName, userJob}) {
        this._userName.textContent = userName;
        this._userJob.textContent = userJob;
    }

    setUserAvatar(urlAvatar) {
        this._userFoto.src = urlAvatar;
    }

}