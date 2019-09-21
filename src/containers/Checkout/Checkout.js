import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';     

class Checkout extends Component {
    state = {
        isFormShowing: false
    }

    checkoutContinueHandler = () => {
        if (!this.state.isFormShowing) {
            this.props.history.replace('checkout/contact-data');
            // i use replace instead of push because i don't want the user to have the ability to go back to the checkout page
        }
        this.setState({isFormShowing: true});

        // i need it to scroll a little bit after tbe contact data is rendered if not it will not scroll down
        setTimeout(() => {
            window.scrollBy({
                top: 500,
                behavior: 'smooth'
              });
        }, 1)
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
                        showForm={this.state.isFormShowing}
                    />    
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        // component={ContactData}
                        render={() => <ContactData formShown={this.state.isFormShowing}/>}
                    />
                </div>
            );
        }

        console.log(this.state.isFormShowing)

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