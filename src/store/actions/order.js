import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, data) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: data
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (data, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('orders', data)
        axios({
            method: 'post',
            url: '/orders',
            data: data,
            headers: {'Authorization': 'Bearer ' + token} 
        })  
            .then(res => {
                console.log(res)

                dispatch(purchaseBurgerSuccess(res.id, data))
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err))
            })
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }; 
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrders = (token) => {
    console.log('theee tokkenn', token)
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios({
            method: 'get',
            url: '/orders',
            headers: {'Authorization': 'Bearer ' + token} 
        })  
        .then(response => {
            console.log(response.data)
            // const fetchedOrders = [];

            // for (let key in response.data) {
            //     fetchedOrders.push({...response.data[key]});
            // }
            // console.log(fetchedOrders)
            dispatch(fetchOrdersSuccess(response.data));
        })
        .catch(err => dispatch(fetchOrdersFail(err)));
    }
};