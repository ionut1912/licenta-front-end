import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class AplicareJobService {

    sendAplicare(user,job,aplicare) {
        return axios.post(API_URL + `aplicarii/user/${user}/job/${job}`,aplicare);
    }

    getAplicarii(){
        return axios.get(API_URL+"aplicarii");
    }
}

export default new AplicareJobService();