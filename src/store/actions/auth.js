import axios from 'axios';

import * as actionTypes from './actionTypes';

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
export const authLogout = () => {
    return {
            type: actionTypes.AUTH_LOGOUT
        }
};
export const checkoutTimeOut = (logoutTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())}
        , logoutTime * 1000);
    }
}
export const setAuthRedirectPath = (path) =>{
    //console.log('actions/auth.js-->SET_AUTH_REDIRECT_PATH', path);
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
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
            try{
               // console.log(res);
                dispatch(authSuccess(res.data));
                dispatch(checkoutTimeOut(res.data.expiresIn));
            }catch(er){console.log(er);}
        })
        .catch(err => {
           // //console.log('error',err);
            dispatch(authFail(err.response.data.error));
        });
    };
}