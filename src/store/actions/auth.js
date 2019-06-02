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
        email: data.email
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration date');
    localStorage.removeItem('user id');

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
        dispatch(authStart());

        let url = isRegister ? '/register' : '/signin';
 
        axios.post(url, authData)
            .then(response => {
                //TODO divide to register signin cases
                const expDate = new Date(new Date().getTime() + 
                    response.data.expirationTime * 1000);

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expiration date', expDate);
                localStorage.setItem('user id', response.data.userId);
                dispatch(authSuccess(response.data)); // response.data(singin) = expirationTime, userId, token, email. response.data(register) = email, id, joined 
                if (!isRegister) {
                    dispatch(checkAuthTimeout(response.data.expirationTime));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const data = {};
        data.token = localStorage.getItem('token');
        
        if (!data.token) {
            dispatch(logout());
        } else {
            const expDate = new Date(localStorage.getItem('expiration date'));
            if (expDate < new Date()) {
                dispatch(logout());
            } else {
                data.userId = localStorage.getItem('user id'); 
                dispatch(authSuccess(data));
                dispatch(checkAuthTimeout( (expDate.getTime() - new Date().getTime()) / 1000 ));
            }
        }
    }   
}