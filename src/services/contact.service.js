import axios from 'axios';

const API_URL = 'http://localhost:8184/';

class ContactService{

    sendContactEmail(emailFrom,message){
        return axios.post(API_URL+"contact",{
            emailFrom,
            message
        });
    }

 
}

export default new ContactService();