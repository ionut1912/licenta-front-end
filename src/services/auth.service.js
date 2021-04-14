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

    logout() {
        localStorage.removeItem("user");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();