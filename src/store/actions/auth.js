import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        user: user
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isRegister) => {
    return dispatch => {
        const authData = {
            email, 
            password
        }
        let url = '/signin';

        dispatch(authStart());
        if (isRegister) {
            url = '/register';

            axios.post(url, authData)
                .then(response => {
                    dispatch(authSuccess(response.data));
                })
                .then(console.log('success registering'))
                .catch(err => {
                    dispatch(authFail(err));
                })
        } else {
            axios.post(url, authData)
                .then(console.log('success signing'))
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err));
                })
        }

    }
}
