import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://40.81.25.86:3000',
});

export default instance;