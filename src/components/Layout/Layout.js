import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        isSideDrawerOpen: false
    }

    toggleSideDrawerHandler = () => {
        this.state.isSideDrawerOpen 
            ? this.setState({ isSideDrawerOpen: false})
            : this.setState({ isSideDrawerOpen: true });
    }


    render() {
        return (
            <>
                <div>
                    <Toolbar open={this.toggleSideDrawerHandler}/>
                    <SideDrawer 
                        show={this.state.isSideDrawerOpen} 
                        close={this.toggleSideDrawerHandler}
                    
                    />
                </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

export default Layout;
