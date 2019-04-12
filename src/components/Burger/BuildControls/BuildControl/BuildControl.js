import React from 'react';
import classes from './BuildControl.css';

const buildControl = props => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <ion-icon
            name="remove"
            className={classes.Less}
            onClick={props.removed}>
        </ion-icon> 
        <ion-icon
            name="add"
            className={classes.More}
            onClick={props.added}>
        </ion-icon> 
    </div>
)

export default buildControl;