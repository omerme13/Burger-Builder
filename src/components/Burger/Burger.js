import React from 'react';
import burgerClasses from './Burger.css';
import Ingredients from './Ingredients/Ingredients';
import Ingredient from './Ingredients/Ingredients';

const burger = props => {
    const ingredientList = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])]
                .map((_, i) => {
                    return <Ingredient key={key + i} type={key} />
                });
        });

    return (
        <div className={burgerClasses.Burger}>
            <Ingredients type="bread-top" />
            {ingredientList}
            <Ingredients type="bread-bottom" />
        </div>
    );
}

export default burger;