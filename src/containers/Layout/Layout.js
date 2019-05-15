import React, { Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

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
                    <Toolbar 
                        open={this.toggleSideDrawerHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                    <SideDrawer 
                        show={this.state.isSideDrawerOpen} 
                        close={this.toggleSideDrawerHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </div>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token
    };
};

export default connect(mapStateToProps)(Layout);
