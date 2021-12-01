import type {
    AxiosBasicCredentials,
    AxiosRequestConfig,
    AxiosRequestHeaders,
} from 'axios';
import type { Token } from './interfaces';

export const FORM_NAMES: AxiosBasicCredentials = {
    username: 'username',
    password: 'password',
};

export const TOKEN: Token = {
    auth: 'authToken',
};

export const HEADERS: AxiosRequestHeaders = {
    'Content-type': 'application/json',
};
export const AXIOS_CONFIG: AxiosRequestConfig = {
    headers: HEADERS,
};
