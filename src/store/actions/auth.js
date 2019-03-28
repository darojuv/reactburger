import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        localId: localId,
        token: token
    }
}
export const authFail = (iError) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: iError
    }
}
export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
               const expirataionDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
               localStorage.setItem('token', res.data.idToken);
               localStorage.setItem('expirationDate', expirataionDate);    
               localStorage.setItem('userId', res.data.localId);
                dispatch(authSuccess(res.data.idToken,res.data.localId));
                dispatch(checkoutTimeOut(res.data.expiresIn));
            }catch(er){console.log(er);}
        })
        .catch(err => {
           // //console.log('error',err);
            dispatch(authFail(err.response.data.error));
        });
    };
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(authLogout());
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(authLogout());
            }else{
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkoutTimeOut((expirationDate.getTime() - new Date().getTime())/1000));
            }
        }
    }
}