import React from 'react';
import classes from './Order.css';

const order = props => {
    const ingredients = [];
    
    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            quantity: props.ingredients[ingName]
        })
    }
    const ingredientsList = ingredients.map(ing => (
        <span key={ing.name}>{ing.name} (<strong>{ing.quantity}</strong>)</span>
    ));

    return (
        <div className={classes.Order}>
            <p><em>{props.time}</em></p>
            <br/>
            <p>{ingredientsList}</p>
            <p>Price: <strong>{props.price.toFixed(2) + '$'}</strong></p>
        </div>
    );
}

export default order;