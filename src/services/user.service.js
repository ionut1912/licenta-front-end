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

    deleteUserImg(id) {
        return axios.put(API_URL + `user/deleteImg/${id}`);
    }

    getNumberOfUsers() {
        return axios.get(API_URL + 'user/numberOfUsers');
    }

    getNumberOfAdmins() {
        return axios.get(API_URL + 'user/numberOfAdmins');
    }

    getNumberOfNormalUsers() {
        return axios.get(API_URL + 'user/numberOfNormalUsers');
    }

    getNumberOfUsersWithAplications() {
        return axios.get(API_URL + 'user/numberOfUsersWithApplications');
    }

}

export default new UserService();