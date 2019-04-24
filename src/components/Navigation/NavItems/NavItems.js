import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = () => (
    <ul className={classes.NavItems}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
        
    </ul>
);

export default navItems;