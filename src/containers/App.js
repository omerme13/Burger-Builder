import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import classes from './App.css';
import Layout from './Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';
import Orders from './Orders/Orders';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout/Logout';

class App extends Component {
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

export default App;
