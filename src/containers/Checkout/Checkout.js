import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';     

class Checkout extends Component {
    state = {
        ingredients: {
            meat: 1,
            cheese: 1,
            bacon: 1,
            salad: 1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let param of query.entries()) {
            ingredients[param[0]] = +param[1];
        }   
        this.setState({ingredients: ingredients});
    }


    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
        // i use replace instead of push because i don't want the 
        // user to have the ability to go back to the checkout page
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutContinue={this.checkoutContinueHandler}
                    checkoutCancel={this.checkoutCancelHandler}
                />    
                <Route 
                    path={this.props.match.path + 'contact-data'}
                    component={ContactData}
                />
            </div>
        );
    }
}

export default Checkout;