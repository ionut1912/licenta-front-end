import axios from 'axios';
import authHeader from './auth-header'

const API_URL = 'http://localhost:8184/';

class CvService {
    getCvs() {
        return axios.get(API_URL + 'cvs', { headers: authHeader() });
    }

    getCv(cvId) {
        return axios.get(API_URL + `cvs/${cvId}`, { headers: authHeader() });
    }
    addCv(cv) {
        return axios.post(API_URL + 'cvs', cv, { headers: authHeader() });
    }

    updateCv(cv) {
        return axios.put(API_URL + 'cvs', cv, { headers: authHeader() });
    }

    deleteCv(cvId) {
        return axios.delete(API_URL + `cvs/${cvId}`, { headers: authHeader() });
    }

    deletePersonalDescription(id) {
        return axios.delete(API_URL + `cvs/personalDescription/${id}`, { headers: authHeader() });
    }

    deleteWork(id) {
        return axios.delete(API_URL + `cvs/work/${id}`, { headers: authHeader() });
    }

    deleteEducation(id) {
        return axios.delete(API_URL + `cvs/education/${id}`, { headers: authHeader() });
    }

    deleteLanguage(id) {
        return axios.delete(API_URL + `cvs/language/${id}`, { headers: authHeader() });
    }

    deleteSkill(id) {
        return axios.delete(API_URL + `cvs/skill/${id}`, { headers: authHeader() });
    }

    deleteHobby(id) {
        return axios.delete(API_URL + `cvs/hobby/${id}`, { headers: authHeader() });
    }

    deleteProject(id) {
        return axios.delete(API_URL + `cvs/project/${id}`, { headers: authHeader() });
    }

    getNumberOfCvs() {
        return axios.get(API_URL + 'cvs/numberOfCvs', { headers: authHeader() });
    }

    getMostUsedSkill() {
        return axios.get(API_URL + 'cvs/skill/mostUsedSkill', { headers: authHeader() });
    }

}

export default new CvService();