import { ACCESS_TOKEN } from '../common/constants';





const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};
export function signup(signupRequest) {
    return request({
        url: '/api/signup',
        method: 'POST',
        body: JSON.stringify(signupRequest)         
    });
}

export function login(loginRequest) {
    return request({
        url: '/api/login',
        method: 'POST',
        body: JSON.stringify(loginRequest)         
    });
}

export function getCurrentUser() {
    return request({
        url: '/api/currentuser',
        method: 'GET'             
    });
}

export function validatNameAvailability(name) {
    return request({
        url: '/api/username?name='+name,
        method: 'GET'             
    });
}

export function validatePasswordAvailability(password) {
    return request({
        url: '/api/userpassword?password='+password,
        method: 'GET'             
    });
}

export function createQuiz(quizData) {
    return request({
        url: '/api/createquiz',
        method: 'POST',
        body: JSON.stringify(quizData)         
    });
}

export function getQuizzes() {
    return request({
        url: '/api/getquiz',
        method: 'GET'             
    });
}