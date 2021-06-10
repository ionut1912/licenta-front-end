import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class AplicareJobService {

    sendAplicareUser(user, job, aplicare) {
        return axios.post(API_URL + `aplicarii/user/${user}/job/${job}`, aplicare);
    }

    sendAplicareNoUser(job, aplicare) {
        return axios.post(API_URL + `aplicarii/job/${job}`, aplicare);
    }

    getAplicarii() {
        return axios.get(API_URL + "aplicarii");
    }

    updateVerificat(id) {
        return axios.put(API_URL + `aplicarii/${id}`);
    }

    deleteAplicare(id) {
        return axios.delete(API_URL + `aplicarii/${id}`);
    }

    getNumberOfApplications() {
        return axios.get(API_URL + 'aplicarii/numberOfApplications');
    }

    getNumberOfApplicationsChecked() {
        return axios.get(API_URL + 'aplicarii/numberOfApplicationsChecked');
    }

    getNumberOfApplicationsToCheck() {
        return axios.get(API_URL + 'aplicarii/numberOfApplicationsToCheck');
    }

    getNumberLastWeekApps() {
        return axios.get(API_URL + 'aplicarii/numberLastWeekApps');
    }

    getNumberAppsFromLastMonth() {
        return axios.get(API_URL + 'aplicarii/numberAppsFromLastMonthPerDay');
    }

}

export default new AplicareJobService();