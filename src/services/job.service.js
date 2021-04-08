import axios from 'axios';


const API_URL = 'http://localhost:8184/';

class JobService {

    getJobs() {
        return axios.get(API_URL + 'jobs');
    }
}

export default new JobService();