import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://omer-burger-builder.herokuapp.com'
});

export default instance;