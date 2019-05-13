import * as actionTypes from './actionTypes';
import axios from '../../axios-base';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.token,
        userId: data.userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => dispatch(logout()), expirationTime * 1000);
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
                .then(response => {
                    dispatch(authSuccess(response.data));
                    dispatch(checkAuthTimeout(response.data.expirationTime));
                    // response.data = expirationTime, userId, token
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err));
                })
        }

    }
}
