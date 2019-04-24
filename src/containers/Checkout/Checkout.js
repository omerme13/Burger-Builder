import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';     

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let params of query.entries()) {
            if (params[0] === 'price') {
                price = params[1];
                break; // i used break to prevent: ingredients[params[0]] = ingredients[price]
            }
            ingredients[params[0]] = +params[1];
        }   
        this.setState({
            ingredients: ingredients,
            totalPrice: price
        });
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
                    path={this.props.match.path + '/contact-data'}
                    render={() => (
                        <ContactData 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...this.props} //added props so i can access the history prop on ContactData
                        />
                    )}
                    // i use 'render' instead of 'component' because i want to pass on props
                />
            </div>
        );
    }
}

export default Checkout;