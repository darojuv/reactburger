import authReducer from './auth';
import * as actoinTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store state upon login', () => {
        expect(authReducer({
            idToken: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {type:actoinTypes.AUTH_SUCCESS, 
            token: 'some-token',
            localId: 'some-userid'
        })).toEqual({
            idToken: 'some-token',
            userId: 'some-userid',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

});


