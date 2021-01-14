import config from '../config';

const TokenService = {

    //to set the user to the localStorage.
    saveUser(user) {
        window.localStorage.setItem('user', JSON.stringify(user))
    },

    //This is to get the user from the localStorage
    getUser() {
        return window.localStorage.getItem('user')
    },
    clearAuthToken() {
        window.localStorage.removeItem()
    },

    //this is for checking to see if user has authorization for being logged in. 
    hasAuthToken() {
        return !!TokenService.getUser()
    },


    // makeBasicAuthToken(userName, password) {
    //     return window.btoa(`${userName}:${password}`)
    // },
}

export default TokenService;
