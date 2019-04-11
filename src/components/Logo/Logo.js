import React from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/images/logo.png';

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="logo"/>
    </div>
);

export default logo;