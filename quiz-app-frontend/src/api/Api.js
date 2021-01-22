import axios from 'axios';

 


class Api{
    signup(signupRequest){
        return axios.post('http://localhost:8080/quizapp/api/signup',signupRequest);
    }

    login(loginRequest){
        return axios.post('http://localhost:8080/quizapp/api/login',loginRequest);
    }

}


export default new Api()