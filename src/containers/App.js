import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';

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
                    <Route path="/logout" component={Logout} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/auth" component={Auth} />
                    <AnimatedSwitch
                        atEnter={{ opc: 0 }}
                        atLeave={{ opc: 0 }}
                        atActive={{ opc: 1 }}
                        mapStyles={(styles) => ({
                            opacity: styles.opc
                        })}
                    >

                        <Route path="/" component={BurgerBuilder} exact/>
                        {/* i'm protecting the route from unauthorized access */
                            this.props.isAuthenticated
                            ? <Route path="/orders" component={Orders} />
                            : null
                        }
                    </AnimatedSwitch>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAutoSignIn: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
