import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Icon from '../../UI/Icon/Icon';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.MobileOnly}>
            <Icon name="menu" clicked={props.open} />
        </div>

        <Logo height="70%"/>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuth={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;