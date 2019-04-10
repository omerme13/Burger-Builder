import React from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => (
    <>
        <Backdrop show={props.show} clicked={props.modalClose}/>
        <div 
            className={classes.Modal}
            style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'}}
        >
            {props.children}
        </div>
    </>
);

export default modal;