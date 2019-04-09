import React from 'react';
import classes from './Modal.css';

const modal = props => (
    
    <div className={classes.Modal}>
        {/* {props.show ? props.children : null} */}
        {props.children}
    </div>
);

export default modal;