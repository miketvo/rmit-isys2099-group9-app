import axios from 'axios';
import { BACKEND_URL } from '../utils/config';


const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use((request) => {
    return request;
}, (error) => {
  // Handle any request errors
  return Promise.reject(error);
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle any request errors
    return Promise.reject(error);
})

export default axiosInstance;