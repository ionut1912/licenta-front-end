import axios from 'axios';
import authHeader from './auth-header'

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
        return axios.delete(API_URL + `skills/${idSkill}`, { headers: authHeader() });
    }

    deleteAtributPersonal(idAtribut) {
        return axios.delete(API_URL + `atributes/${idAtribut}`, { headers: authHeader() });
    }

    deleteDetaliu(idDetaliu) {
        return axios.delete(API_URL + `detalii/${idDetaliu}`, { headers: authHeader() });
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

    getNumberOfJobsPerLocations() {
        return axios.get(API_URL + 'jobs/jobsPerLocation');
    }

    getNumberOfApplicationsPerJob() {
        return axios.get(API_URL + 'jobs/applicationsPerJob');
    }

    getNumberOfApplicationsPerJobLastWeek() {
        return axios.get(API_URL + 'jobs/applicationsFromLastWeekPerJob');
    }
}

export default new JobService();