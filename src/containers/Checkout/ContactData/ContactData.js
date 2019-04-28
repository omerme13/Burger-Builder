import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button'; 
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {

    createInput = (kind, config, value) => {
        let configuration = {
                type: config.type,
                placeholder: config.placeholder
        }
    
        if (kind === 'select') {
            const options = [];

            config.options.forEach((_, i) => {
                options.push({
                    value: config.options[i].value, 
                    displayValue: config.options[i].displayValue
                })
            })

            configuration = {
                options
            }   
        }

        return (
            {   
                kind: kind,
                value: value,
                config: configuration
            }
        )
    }

    state = {
        orderForm: {
            name: this.createInput('input', {type: 'text', placeholder: 'Your Name'},''),
            city: this.createInput('input', {type: 'text', placeholder: 'City'},''),
            street: this.createInput('input', {type: 'text', placeholder: 'Street'},''),
            email: this.createInput('input', {type: 'email', placeholder: 'Your Email'} ,''),
            deliveryMethod: this.createInput('select',{
                options: [
                    {value: 'cheapest', displayValue: 'Cheapest'},
                    {value: 'fast', displayValue: 'Fast'}
                ]
            }, 'fast') // i set the default value to fast
        },
        isLoading: false
    }

    placeOrderHandler = (e) => {
        this.setState({isLoading: true});
        const {salad, bacon, cheese, meat} = this.props.ingredients;
        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        console.log(formData)

        axios({
            method: 'post',
            url: '/orders',
            data: {
                salad: salad,
                bacon: bacon,
                cheese: cheese,
                meat: meat,
                // TODO userId: userId 
                price: this.props.price,
                deliveryMethod: this.state.orderForm.deliveryMethod
            }
        })
        .then(res => {
            setTimeout(() => this.setState({isLoading: false}), 500); 
            this.props.history.push('/');
        })
            
        
        .catch(err => this.setState({isLoading: false}));
        e.preventDefault();
    }

    inputChangeHandler = (e, inputId) => {
        // This is a method to change nested state.
        // The usual way won't work
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[inputId]};

        updatedElement.value = e.target.value;
        updatedForm[inputId] = updatedElement;
        this.setState({orderForm: updatedForm});
 
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                data: this.state.orderForm[key]
            })
        }
        
        const elementsList = formElements.map((elem) =>(
            <Input 
                key={elem.id}
                kind={elem.data.kind}
                config={elem.data.config}
                value={elem.data.value}
                changed={(e) => this.inputChangeHandler(e, elem.id)}
            />
        ))

        let form = <form onSubmit={this.placeOrderHandler}>
            {elementsList}
            <Button type="Success">ORDER</Button>
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