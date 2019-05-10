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
        authData: data
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
        let url = '/test/signin';

        dispatch(authStart());
        if (isRegister) {
            url = 'test/register';

            axios.post(url, authData)
                .then(response => {
                    console.log(response);
                    dispatch(authSuccess(response.data));
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err));
                })
        } else {
            axios({
                method: 'post',
                url: '/test/signin',
                data: authData,
                headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJvbWVyIiwiZW1haWwiOiJvbWVyQG9tZXIuY29tIn0sImlhdCI6MTU1NzQ4NDkwNX0.wLeE6nqfNMUSiyBads9-22HUD0CE2HN-gfRd-oKcnY4"}
            })    
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
        }

    }
}
