import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-772be.firebaseio.com/'
});
// const instance = axios.create({
//     baseURL: 'https://react-my-burger-772be.firebaseapp.com/'
// });

export default instance;