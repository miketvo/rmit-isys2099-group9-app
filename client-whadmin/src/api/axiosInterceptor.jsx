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

export function setupResponseInterceptor() {
    axiosInstance.interceptors.response.use((response) => {
        return response;

    }, async(error) => {

        // Handle error 403 and 500
        if (error.response.status === 403 || error.response.status === 500) {
            localStorage.removeItem("userInfo");
        }
        return Promise.reject(error);
    })
}

export default axiosInstance;