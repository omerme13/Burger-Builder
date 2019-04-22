import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './App.css';
import Layout from './Layout/Layout';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Checkout from './Checkout/Checkout';

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                
                <Layout>
                    <Route path="/" exact component={BurgerBuilder} /> 
                    <Route path="/checkout" component={Checkout} />
                </Layout>
            </div>
        );
    }
}

export default App;
