import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class CvService {
    getCvs() {
        return axios.get(API_URL + 'cvs');
    }

    getCv(cvId) {
        return axios.get(API_URL + `cvs/${cvId}`);
    }
    addCv(cv) {
        return axios.post(API_URL + 'cvs', cv);
    }

    updateCv(cv) {
        return axios.put(API_URL + 'cvs', cv);
    }

    deleteCv(cvId) {
        return axios.delete(API_URL + `cvs/${cvId}`);
    }

    deletePersonalDescription(id) {
        return axios.delete(API_URL + `cvs/personalDescription/${id}`);
    }

    deleteWork(id) {
        return axios.delete(API_URL + `cvs/work/${id}`);
    }

    deleteEducation(id) {
        return axios.delete(API_URL + `cvs/education/${id}`);
    }

    deleteLanguage(id) {
        return axios.delete(API_URL + `cvs/language/${id}`);
    }

    deleteSkill(id) {
        return axios.delete(API_URL + `cvs/skill/${id}`);
    }

    deleteHobby(id) {
        return axios.delete(API_URL + `cvs/hobby/${id}`);
    }

    deleteProject(id) {
        return axios.delete(API_URL + `cvs/project/${id}`);
    }

}

export default new CvService();