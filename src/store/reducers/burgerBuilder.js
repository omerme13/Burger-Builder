import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
} 

const reducer = (state = initialState, action) => {
    
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] + 1
                },
                totalPrice: state.totalPrice + prices[action.name]
            }; 

        case actionTypes.REMOVE_INGREDIENT:
            if (!state.ingredients[action.name]) {
                return state;
            }

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.name]: state.ingredients[action.name] - 1
                },
                totalPrice: state.totalPrice - prices[action.name]
            };    
 
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: initialState.totalPrice
            };    

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };    

        default: 
            return state;    
    }
}

export default reducer;