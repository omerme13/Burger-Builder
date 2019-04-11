import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        isPurchasable: false,
        purchasing: false
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
        this.setState({purchasing: true});
    }
    
    cancelPurchaseHandler = () => {
        this.setState({purchasing: false})
    }

    continuePurchaseHandler = () => {

    }



    render() {
        return (
            <>
                <Modal 
                    show={this.state.purchasing}
                    modalClose={this.cancelPurchaseHandler}
                >
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    continueOrder={this.continuePurchaseHandler}
                    cancelOrder={this.cancelPurchaseHandler}
                    price={this.state.totalPrice}
                />
                </Modal>            
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngHandler} 
                    ingredientRemoved={this.removeIngHandler}
                    price={this.state.totalPrice}
                    isPurchasable={this.state.isPurchasable}
                    ordered={this.purchaseHandler}
                />
            </>
        );
    }
}

export default BurgerBuilder;