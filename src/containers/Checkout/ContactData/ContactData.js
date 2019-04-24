import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'; 
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        }, 
        isLoading: false
    }

    placeOrderHandler = (e) => {
        this.setState({isLoading: true});
        const {salad, bacon, cheese, meat} = this.props.ingredients;

        axios({
            method: 'post',
            url: '/orders',
            data: {
                salad: salad,
                bacon: bacon,
                cheese: cheese,
                meat: meat,
                price: this.props.price
            }
        })
        .then(res => {
            setTimeout(() => this.setState({isLoading: false}), 500); 
            this.props.history.push('/');
        })
            
        
        .catch(err => this.setState({isLoading: false}));
        e.preventDefault();
    }

    render() {
        let form = <form>
            <input type="text" name="name" placeholder="Your Name" />
            <input type="email" name="email" placeholder="Your Email" />
            <input type="text" name="street" placeholder="Street" />
            <input type="text" name="postal" placeholder="Postal Code" />
            <Button type="Success" clicked={this.placeOrderHandler}>ORDER</Button>
        </form>

        if (this.state.isLoading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your details please</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;