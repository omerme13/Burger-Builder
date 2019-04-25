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
                const fetchedOrders = [];

                for (let key in res.data) {
                    fetchedOrders.push({...res.data[key]});
                }
                this.setState({isLoading: false, orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({isLoading: false})
            })
    }    

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
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
                ))}
            </div>
        );
    }
}

export default withError(Orders, axios);