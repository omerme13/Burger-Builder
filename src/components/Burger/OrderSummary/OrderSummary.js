import React from 'react';
import classes from './OrderSummary.css';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => (
            <li key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {props.ingredients[key]}
            </li>
        ));

    return (
        <div className={classes.OrderSummary}>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price:</strong> {props.price.toFixed(2)}$</p>
            <p>Continue to checkout?</p>
            <Button clicked={props.continueOrder} type='Success'>Continue</Button>
            <Button clicked={props.cancelOrder} type='Danger'>Cancel</Button>
        </div>
    );
}

export default orderSummary;