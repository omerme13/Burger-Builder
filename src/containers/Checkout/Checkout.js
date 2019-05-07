import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';     

class Checkout extends Component {
    checkoutContinueHandler = () => {
        this.props.history.replace('checkout/contact-data');
        // i use replace instead of push because i don't want the 
        // user to have the ability to go back to the checkout page
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to='/' />

        if (this.props.ing) {
            const purchasedRedirect = this.props.isPurchased
                ? <Redirect to='/' />
                : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ing} 
                        checkoutContinue={this.checkoutContinueHandler}
                        checkoutCancel={this.checkoutCancelHandler}
                    />    
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        isPurchased: state.order.isPurchased
    };
};

export default connect(mapStateToProps)(Checkout);