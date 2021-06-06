import axios from 'axios';


const API_URL = 'http://localhost:8184/';

class JobService {

    getJobs() {
        return axios.get(API_URL + 'jobs');
    }

    getJob(jobId) {
        return axios.get(API_URL + `jobs/${jobId}`);
    }

    addJob(newJob) {
        return axios.post(API_URL + 'jobs', newJob);
    }

    updateJob(newJob) {
        return axios.put(API_URL + 'jobs', newJob);
    }

    deleteJob(jobId) {
        return axios.delete(API_URL + `jobs/${jobId}`);
    }

    deleteSkill(idSkill) {
        return axios.delete(API_URL + `skills/${idSkill}`);
    }

    deleteAtributPersonal(idAtribut) {
        return axios.delete(API_URL + `atributes/${idAtribut}`);
    }

    deleteDetaliu(idDetaliu) {
        return axios.delete(API_URL + `detalii/${idDetaliu}`);
    }

    getNumberOfJobs() {
        return axios.get(API_URL + 'jobs/numberOfJobs');
    }

    getNumberOfActiveJobs() {
        return axios.get(API_URL + 'jobs/numberOfActiveJobs');
    }

    getNumberOfInactiveJobs() {
        return axios.get(API_URL + 'jobs/numberOfInactiveJobs');
    }
}

export default new JobService();