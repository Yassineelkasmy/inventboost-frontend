import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    withCredentials: true,
    timeout: 15000,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error('Axios Error:', error);
        return Promise.reject(error);
    }
);


export default axiosInstance
export type { ApiResponse }