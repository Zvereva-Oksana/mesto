export default class UserInfo {
    constructor({nameSelector, jobSelector}) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            userNamePage: this._userName.textContent,
            userJobPage: this._userJob.textContent,
        }
    }

    setUserInfo({userName, userJob}) {
        this._userName.textContent = userName;
        this._userJob.textContent = userJob;
    }
}