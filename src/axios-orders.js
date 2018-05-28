import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-772be.firebaseio.com/'
});

export default instance;