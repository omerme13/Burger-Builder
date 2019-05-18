import React from 'react';
import NavItem from './NavItem/NavItem';
import classes from './NavItems.css';

const navItems = props => (
    <ul className={classes.NavItems} onClick={props.clicked}>
        <NavItem link="/" exact>Burger Builder</NavItem>
        {props.isAuth 
            ? <>
                <NavItem link="/orders">Orders</NavItem>
                <NavItem link="/logout">Logout</NavItem>
              </>  
            : <NavItem link="/auth">Authentication</NavItem>}
    </ul>
);

export default navItems;