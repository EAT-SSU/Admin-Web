import axios from 'axios';
import ErrorStructure from './errorStructure';
import SuccessResponse from './successResponse';
import {getAccressToken} from '../storage/Cookie';
const BASE_URL = process.env.REACT_APP_API_HOST;

// Authorization header 없이 HTTP 요청을 보내는 함수
export async function sendHttpRequest(method, url, data = {}, options = {}) {
    const config = {
        method: method,
        url: BASE_URL + url,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        data: data,
        ...options
    };
    try {
        console.log(config.url);
        const response = await axios(config);
        return new SuccessResponse(response.data);
    } catch (error) {
        const customError = ErrorStructure.parseError(error);
        console.error('Error while fetching:', customError);
        throw customError;
    }
}

// Authorization header와 함께 HTTP 요청을 보내는 함수
export async function sendAuthorizedHttpRequest(method, url, data = {}, authOptions = {}) {
    const token = getAccressToken(); // 토큰은 로컬 스토리지에 저장
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        ...authOptions
    };
    return sendHttpRequest(method, url, data, config);
}