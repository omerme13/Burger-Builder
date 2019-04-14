import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

/* I change the component into smart component because i wanted to use
should/will component update. the reason I used it is to improve the app's 
performance so it won't render redundant things */
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show;
    }

    componentWillUpdate() {
        console.log('willUpdate')
    }

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
                <div 
                    className={classes.Modal}
                    style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-200%)'}}
                >
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default Modal;