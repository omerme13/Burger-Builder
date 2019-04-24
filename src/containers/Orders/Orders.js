import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withError from '../../HOC/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get('/orders')
            .then(res => {
                // this.setState({isLoading: false})
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log(fetchedOrders)
            })
            .catch(err => {
                this.setState({isLoading: false, orders: this.fetchedOrders})
            })
    }    

    render() {

        return (
            <div>
                <Order />
                <Order />
            </div>
        );
    }

}

export default withError(Orders, axios);