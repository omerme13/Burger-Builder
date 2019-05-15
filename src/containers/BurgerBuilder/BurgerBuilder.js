import React, {Component} from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const initialState = {
    purchasing: false
}


class BurgerBuilder extends Component {
    state = initialState;

    componentDidMount() {
        this.props.onIngInit();
    }
    
    
    areThereIngredients = ingredients => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, element) => acc + element, 0);
        return sum > 0; 
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        }
    }
    
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    finishPurchaseHandler = () => {
        this.setState(initialState);
    }

    continuePurchaseHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


    render() {
        let burger = this.props.error 
            ? <p>sorry we had a problem...</p> 
            : <Spinner />;
        let orderSummary = null;

        if (this.props.ing) {
            burger = (
                <>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        ingredientAdded={this.props.onIngAdded}
                        ingredientRemoved={this.props.onIngRemoved}
                        price={this.props.price}
                        isPurchasable={this.areThereIngredients(this.props.ing)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ing}
                continueOrder={this.continuePurchaseHandler}
                cancelOrder={this.cancelPurchaseHandler}
                price={this.props.price}
            />;
        }

        return (
            <>
                <Modal 
                    show={this.state.purchasing}
                    modalClose={this.cancelPurchaseHandler}
                    >
                    {orderSummary}        
                </Modal>            
                {burger}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onIngInit: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));