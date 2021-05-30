import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class CvService {

    addCv(cv) {
        return axios.post(API_URL + 'cvs', cv);
    }

}

export default new CvService();