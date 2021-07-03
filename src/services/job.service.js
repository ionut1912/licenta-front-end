import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://localhost:8184/';

class JobService {

    getJobs() {
        return axios.get(API_URL + 'jobs', { headers: authHeader() });
    }

    getJobsActives() {
        return axios.get(API_URL + 'jobs/actives', { headers: authHeader() });
    }

    getJob(jobId) {
        return axios.get(API_URL + `jobs/${jobId}`, { headers: authHeader() });
    }

    addJob(newJob) {
        return axios.post(API_URL + 'jobs', newJob, { headers: authHeader() });
    }

    updateJob(newJob) {
        return axios.put(API_URL + 'jobs', newJob, { headers: authHeader() });
    }

    deleteJob(jobId) {
        return axios.delete(API_URL + `jobs/${jobId}`, { headers: authHeader() });
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
        return axios.get(API_URL + 'jobs/numberOfJobs', { headers: authHeader() });
    }

    getNumberOfActiveJobs() {
        return axios.get(API_URL + 'jobs/numberOfActiveJobs', { headers: authHeader() });
    }

    getNumberOfInactiveJobs() {
        return axios.get(API_URL + 'jobs/numberOfInactiveJobs', { headers: authHeader() });
    }

    getNumberOfJobsPerLocations() {
        return axios.get(API_URL + 'jobs/jobsPerLocation', { headers: authHeader() });
    }

    getNumberOfApplicationsPerJob() {
        return axios.get(API_URL + 'jobs/applicationsPerJob', { headers: authHeader() });
    }

    getNumberOfApplicationsPerJobLastWeek() {
        return axios.get(API_URL + 'jobs/applicationsFromLastWeekPerJob', { headers: authHeader() });
    }
}

export default new JobService();