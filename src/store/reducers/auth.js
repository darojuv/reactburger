import * as actionTypes from '../actions/actionTypes';
import updatedObject from '../../shared/utility';

const initStateAuth = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state) => {
    return updatedObject(state, { loading:true, error:null });
};

const authSuccess = (state, action) => {
    return updatedObject(state, {
            idToken: action.token, 
            userId: action.localId, 
            error:null, 
            loading: false
        });
};

const authFail = (state, action) => {
    return updatedObject(state,{
            error:action.error, 
            loading: false
        });
};

const authLogout = (state, action) => {
   // //console.log('logging out');
    return updatedObject(state, {idToken: null, userId: null});
};
const setAuthRedirectPath = (state, action) => {
    //console.log('reducer/auth.js-->setAuthRedirectPath',state, action);
    return updatedObject(state, {authRedirectPath:action.path});
}
const authReducer = (state = initStateAuth, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}
export default authReducer;