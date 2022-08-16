import { store } from './../stores/store';
import { Activity } from './../models/Activity';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../../index';
import { request } from 'http';
import { User } from '../models/User';
import { UserFormValues } from '../models/UserFormValues';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}
axios.defaults.baseURL = 'https://localhost:7180/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, error => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if (typeof data == 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/notfound');
            }
            if (data.errors) {
                const listErrors: any[] = [];
                for (const item in data.errors) {
                    if (data.errors[item]) {
                        listErrors.push(data.errors[item]);
                    }
                }
                throw listErrors.flat();
            }

            break;
        case 401:
            toast.error('unauthorize');
            break;
        case 404:
            history.push('/notfound');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');

            toast.error('server error');
            break;
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activity'),
    details: (id: string) => requests.get<Activity>(`/activity/${id}`),
    create: (activity: Activity) => requests.post<void>('/activity', activity),
    update: (activity: Activity) => requests.put<void>(`/activity/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`/activity/${id}`),

}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
}
export default agent;