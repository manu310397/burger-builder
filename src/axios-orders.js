import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-4a877.firebaseio.com/'
});

export default axiosInstance;