import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class UserService {

    getUser(userId) {
        return axios.get(API_URL + `user/${userId}`);
    }

    getUserAplications(userId){
        return axios.get(API_URL + `user/${userId}/aplicarii`);
    }

    updateUserInformation(newInfo){
        return axios.put(API_URL+'user',newInfo);
    }
}

export default new UserService();