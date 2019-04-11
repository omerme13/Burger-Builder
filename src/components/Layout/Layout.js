import React from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <>
        <div>
            <Toolbar />
        </div>
        <main className={classes.content}>
            {props.children}
        </main>
    </>
);

export default layout;
