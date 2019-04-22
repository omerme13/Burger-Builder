import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
} 

const initialState = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    purchasing: false,
    isLoading: false,
    error: false
}


class BurgerBuilder extends Component {
    state = initialState;

    componentDidMount() {
        axios.get('/ingredients')
        .then(res => {
            this.setState({ingredients: res.data[0]})
        })
        .catch(err => this.setState({error: true}))
    }
    
    updateReadyState = ingredients => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((acc, element) => acc + element, 0);
        this.setState({isPurchasable: sum > 0}); 
    }

    updateIng = (type, isAdd) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        let newPrice = this.state.totalPrice;

        if (isAdd === true) {
            updatedIngredients[type]++; 
            newPrice += prices[type];
        } else {
            updatedIngredients[type]--; 
            newPrice -= prices[type];
        }

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        return updatedIngredients;
    }

    addIngHandler = type => {
        const updatedIngredients = this.updateIng(type, true);
        this.updateReadyState(updatedIngredients);
    }

    removeIngHandler = type => {
        if (this.state.ingredients[type]) {
            const updatedIngredients = this.updateIng(type, false);
            this.updateReadyState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }
    
    cancelPurchaseHandler = () => {
        this.setState({ purchasing: false });
    }

    finishPurchaseHandler = () => {
        this.setState(initialState);
    }

    continuePurchaseHandler = () => {
        // this.setState({isLoading: true});
        // const {salad, bacon, cheese, meat} = this.state.ingredients;

        // axios({
        //     method: 'post',
        //     url: '/orders',
        //     data: {
        //         salad: salad,
        //         bacon: bacon,
        //         cheese: cheese,
        //         meat: meat,
        //         price: this.state.totalPrice
        //     }
        // })
        // .then(res => setTimeout(() => this.setState({isLoading: false, purchasing: false}), 500))
        // .catch(err => this.setState({ isLoading: false, purchasing: false}));

        this.props.history.push('/checkout');
    }


    render() {
        let burger = this.state.error 
            ? <p>sorry we had a problem...</p> 
            : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger = (
                <>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngHandler}
                        ingredientRemoved={this.removeIngHandler}
                        price={this.state.totalPrice}
                        isPurchasable={this.state.isPurchasable}
                        ordered={this.purchaseHandler}
                    />
                </>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                continueOrder={this.continuePurchaseHandler}
                cancelOrder={this.cancelPurchaseHandler}
                price={this.state.totalPrice}
            />;
        }

        if (this.state.isLoading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);