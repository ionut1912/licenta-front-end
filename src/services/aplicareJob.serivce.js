import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://localhost:8184/';

class AplicareJobService {

    sendAplicareUser(user, job, aplicare) {
        return axios.post(API_URL + `aplicarii/user/${user}/job/${job}`, aplicare, { headers: authHeader() });
    }

    sendAplicareNoUser(job, aplicare) {
        return axios.post(API_URL + `aplicarii/job/${job}`, aplicare, { headers: authHeader() });
    }

    getAplicarii() {
        return axios.get(API_URL + "aplicarii", { headers: authHeader() });
    }

    updateVerificat(id) {
        return axios.put(API_URL + `aplicarii/${id}`, { headers: authHeader() });
    }

    deleteAplicare(id) {
        return axios.delete(API_URL + `aplicarii/${id}`, { headers: authHeader() });
    }

    getNumberOfApplications() {
        return axios.get(API_URL + 'aplicarii/numberOfApplications', { headers: authHeader() });
    }

    getNumberOfApplicationsChecked() {
        return axios.get(API_URL + 'aplicarii/numberOfApplicationsChecked', { headers: authHeader() });
    }

    getNumberOfApplicationsToCheck() {
        return axios.get(API_URL + 'aplicarii/numberOfApplicationsToCheck', { headers: authHeader() });
    }

    getNumberLastWeekApps() {
        return axios.get(API_URL + 'aplicarii/numberLastWeekApps', { headers: authHeader() });
    }

    getNumberAppsFromLastMonth() {
        return axios.get(API_URL + 'aplicarii/numberAppsFromLastMonthPerDay', { headers: authHeader() });
    }
}

export default new AplicareJobService();