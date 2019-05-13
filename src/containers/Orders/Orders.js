import React, { Component } from 'react';
import {connect} from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withError from '../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }    

    render() {
        let orders = this.props.isLoading
            ? <Spinner />
            : this.props.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients={{
                        meat: order.meat,
                        cheese: order.cheese,
                        salad: order.salad,
                        bacon: order.bacon
                    }}
                    price={+order.price}
                />
            ));

        return orders;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        isLoading: state.order.isLoading,
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));