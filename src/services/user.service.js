import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://localhost:8184/';

class UserService {

    getAllUsers() {
        return axios.get(API_URL + `user`, { headers: authHeader() });
    }

    getUserAplications(userId) {
        return axios.get(API_URL + `user/${userId}/aplicarii`, { headers: authHeader() });
    }

    updateUserInformation(newInfo) {
        return axios.put(API_URL + 'user', newInfo, { headers: authHeader() });
    }

    deleteUserImg(id) {
        return axios.put(API_URL + `user/deleteImg/${id}`, { headers: authHeader() });
    }

    getNumberOfUsers() {
        return axios.get(API_URL + 'user/numberOfUsers', { headers: authHeader() });
    }

    getNumberOfAdmins() {
        return axios.get(API_URL + 'user/numberOfAdmins', { headers: authHeader() });
    }

    getNumberOfNormalUsers() {
        return axios.get(API_URL + 'user/numberOfNormalUsers', { headers: authHeader() });
    }

    getNumberOfUsersWithAplications() {
        return axios.get(API_URL + 'user/numberOfUsersWithApplications', { headers: authHeader() });
    }

}

export default new UserService();