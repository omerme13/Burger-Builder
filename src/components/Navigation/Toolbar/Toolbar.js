import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';

const toolbar = props => (
    <header className={classes.Toolbar}>
        <ion-icon name="menu"></ion-icon>
        <Logo height="70%"/>
        <nav>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;