import React from 'react';
import classes from './OrderSummary.css';

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
            <p>Continue to checkout?</p>
        </div>
    );
}

export default orderSummary;