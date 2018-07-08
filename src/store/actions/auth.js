import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const authSuccess = (iAuthData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: iAuthData
    }
}
export const authFail = (iError) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: iError
    }
}
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyA1MOo5mdV8jnrfpG9vwqqht2zrYEWeTx0';
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA1MOo5mdV8jnrfpG9vwqqht2zrYEWeTx0';
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            console.log('error',err);
            dispatch(authFail(err.response.data.error));
        });
    };
}