import axios from 'axios';

const API_URL = "http://localhost:8184/user/";

class AuthService {

    login(email, password) {
        return axios.post(API_URL + "signin", {
            email,
            password
        })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    register(full_name, email, phone, password) {
        return axios.post(API_URL + "signup", {
            full_name,
            email,
            phone,
            password
        });
    }

    generateVerifyCode(email, codeType) {
        return axios.put(API_URL + `sendCode/${email}/${codeType}`)
    }

    checkVerifyCodee(email, codeType, code) {
        return axios.put(API_URL + `checkCode/${codeType}/${email}/${code}`)
    }

    changePassword(email, password) {
        return axios.put(API_URL + `changePassword/${email}/${password}`)
    }

    getVerificationCode(email,password){
        return axios.get(API_URL + `getVerificationCode/${email}/${password}`)
    }

    setCodeToNull(email){
        return axios.put(API_URL + `setCodeToNull/${email}`)
    }

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();