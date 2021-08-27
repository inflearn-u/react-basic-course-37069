import axios from 'axios';
import {
    LOGIN_USER
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