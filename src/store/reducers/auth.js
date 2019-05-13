import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                isLoading: true
            };
            
        case actionTypes.AUTH_SUCCESS:
            return {
                token: action.token,
                userId: action.userId,
                error: null,
                isLoading: false
            };    

        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                isLoading: false
            };

        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null, 
                userId: null
            };            

        
        default:     
            return state;
    }
}

export default reducer;