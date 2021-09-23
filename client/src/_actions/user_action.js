import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types'

export function loginUser(dataToSubmit) {

    // response.data 을 request에 저장
    const request = axios.post('/api/user/login', dataToSubmit)
    .then(response => response.data)

    // To Reducer
    return {
        type: LOGIN_USER,
        payload : request
    }
}

export function RegisterUser(dataToSubmit) {

    // response.data 을 request에 저장
    const request = axios.post('/api/user/register', dataToSubmit) // body
    .then(response => response.data)

    // To Reducer
    return {
        type: REGISTER_USER,
        payload : request
    }
}
export function auth() {

    // response.data 을 request에 저장
    const request = axios.get('/api/user/auth') 
    .then(response => response.data)

    // To Reducer
    return {
        type: AUTH_USER,
        payload : request
    }
}