import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class UserService {

    getAllUsers() {
        return axios.get(API_URL + `user`);
    }

    getUser(userId) {
        return axios.get(API_URL + `user/${userId}`);
    }

    getUserAplications(userId) {
        return axios.get(API_URL + `user/${userId}/aplicarii`);
    }

    updateUserInformation(newInfo) {
        return axios.put(API_URL + 'user', newInfo);
    }

    deleteUser(userId) {
        return axios.delete(API_URL + `user/${userId}`);
    }
}

export default new UserService();