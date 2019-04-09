import React from 'react';
import burgerClasses from './Burger.css';
import Ingredients from './Ingredients/Ingredients';
import Ingredient from './Ingredients/Ingredients';

const burger = props => {
    let ingredientList = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])]
                .map((_, i) => {
                    return <Ingredient key={key + i} type={key} />
                });
        })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, []);
    
        if (!ingredientList.length) {
            ingredientList = <p>Please add ingredients!</p>;
        }
    console.log(ingredientList, ingredientList.length);
    return (
        <div className={burgerClasses.Burger}>
            <Ingredients type="bread-top" />
            {ingredientList}
            <Ingredients type="bread-bottom" />
        </div>
    );
}

export default burger;