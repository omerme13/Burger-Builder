import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './App.css';
import Layout from './Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onAutoSignIn();
    }

    render() {
        return (
            <div className={classes.App}>
                
                <Layout>
                    <Route path="/" exact component={BurgerBuilder} /> 
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/logout" component={Logout} />
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignIn: () => dispatch(actions.authCheckState())
    };
};

export default connect(null, mapDispatchToProps)(App);
