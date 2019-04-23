import React from 'react';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
 
const CheckoutSummary = props => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope you will enjoy your hamburger</h1>
            <div className={classes.Burger}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                type="Danger" 
                clicked={props.checkoutCancel}>
                CANCEL
            </Button>
            <Button 
                type="Success" 
                clicked={props.checkoutContinue}>
                CONTINUE
            </Button>
        </div>
    );
}

export default CheckoutSummary;