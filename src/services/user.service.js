import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class UserService {

    getUserAplicarii(userId) {
        return axios.get(API_URL + `user/${userId}`);
    }

}

export default new UserService();