import React from 'react';
import classes from './ErrorMessage.css';

const errorMessage = props => (
    <div className={classes.ErrorMessage}>
        {props.children}
    </div>
)

export default errorMessage;