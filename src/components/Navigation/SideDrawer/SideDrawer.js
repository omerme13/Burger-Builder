import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems'; 
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.show) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <BackDrop show={props.show} clicked={props.close} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo height="70%"/>
                </div>
                <nav>
                    <NavItems isAuth={props.isAuth} clicked={props.close}/>
                </nav>
            </div>
        </>
    );
}

export default sideDrawer;