import React from 'react';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';

import classes from './Burger.css';
import Ingredients from './Ingredients/Ingredients';
import Ingredient from './Ingredients/Ingredients';

const burger = props => {
    let ingredientList = Object.keys(props.ingredients)
        .map(key => {
            return [...Array(props.ingredients[key])]
                .map((_, i) => {
                    return (
                        <CSSTransition key={key + i} timeout={200} classNames="fade">
                            <Ingredient  type={key} />
                        </CSSTransition>
                    )
                });
        })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, []);
    
    if (!ingredientList.length) {
            ingredientList = (
                <CSSTransition timeout={200}>
                    <p>Please add ingredients!</p>
                </CSSTransition>
            );
    }

    return (
        <div className={classes.Burger}>
            <Ingredients type="bread-top" />
            <TransitionGroup className={classes.IngList}>
                {ingredientList}
            </TransitionGroup>
            <Ingredients type="bread-bottom" />
        </div>
    );
}

export default burger;