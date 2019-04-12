import React from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <>
        <div>
            <Toolbar />
            <SideDrawer />
        </div>
        <main className={classes.content}>
            {props.children}
        </main>
    </>
);

export default layout;
