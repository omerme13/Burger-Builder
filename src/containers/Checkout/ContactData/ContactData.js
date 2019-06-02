import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button'; 
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Form/Input/Input';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import withError from '../../../HOC/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import checkValidity from '../../../shared/checkValidity';

const createInput = (kind, config, value, validation) => {
    let configuration = {
        type: config.type,
        placeholder: config.placeholder
    }

    let isValid = false;

    if (kind === 'select') {
        const options = [];

        for (let option of config.options) {
            options.push({
                value: option.value,
                displayValue: option.displayValue
            })
        }

        configuration = {
            options
        }   

        isValid = true;
    }

    return ({   
        kind: kind,
        config: configuration,
        value: value,
        validation: validation,
        isValid: isValid, 
        touched: false
    })
}

const inputs = {
    name: createInput('input', {type: 'text', placeholder: 'Your Name'}, '', 
    {
        required : true,
        minLen: 2,
        maxLen: 32
    }),
    city: createInput('input', {type: 'text', placeholder: 'City'}, '', 
    {
        required : true,
        minLen: 2,
        maxLen: 32
    }),
    street: createInput('input', {type: 'text', placeholder: 'Street'}, '', 
    {
        required : true,
        minLen: 2,
        maxLen: 32
    }),

    deliveryMethod: createInput('select',{
        options: [
            {value: 'cheapest', displayValue: 'Cheapest'},
            {value: 'fast', displayValue: 'Fast'}
        ]
    }, 'fast', {}) // i set the default value to fast. Also validation to empty object because the program tried to read property of undefined  
}

class ContactData extends Component {  
    state = {
        orderForm: {
            name: inputs.name,
            city: inputs.city,
            street: inputs.street,
            // for the email i had to write all of it in the state so it could get the email value from the props
            email: createInput('input', {type: 'email', placeholder: 'Your Email'}, this.props.email, 
            {
                required : true,
                minLen: 5,
                maxLen: 32
            }),
            deliveryMethod: inputs.deliveryMethod
        },
        isFormValid: false
    }

    placeOrderHandler = (e) => {
        const {salad, bacon, cheese, meat} = this.props.ing;
        const {name, city, street, email, deliveryMethod} = this.state.orderForm;
        const formData = {};

        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const data = {
                salad: salad,
                bacon: bacon,
                cheese: cheese,
                meat: meat,
                // TODO userId: userId (see the server)
                name: name,
                city: city,
                street: street,
                email: email,
                deliveryMethod: deliveryMethod
        }
        this.props.onOrder(data, this.props.token)
        e.preventDefault();
    }

    inputChangeHandler = (e, inputId) => {
        console.log(this.props.email, this.props.token)
        // This is a method to change nested state. The usual way won't work
        const updatedForm = {...this.state.orderForm};
        const updatedElement = {...updatedForm[inputId]};

        updatedElement.touched = true;
        updatedElement.value = e.target.value;
        updatedElement.isValid = checkValidity(updatedElement.value, updatedElement.validation);
        updatedForm[inputId] = updatedElement;

        let isFormValid = true;

        for (let key in updatedForm) {
            isFormValid = updatedForm[key].isValid && isFormValid;
        }

        this.setState({
            orderForm: updatedForm,
            isFormValid: isFormValid
        });
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                data: this.state.orderForm[key]
            })
        }
        
        const elementsList = formElements.map((elem) => (
            <Input 
                key={elem.id}
                kind={elem.data.kind}
                config={elem.data.config}
                value={elem.data.value}
                isValid={elem.data.isValid}
                touched={elem.data.touched}
                changed={(e) => this.inputChangeHandler(e, elem.id)}
            />
        ))

        let form = (
            <form onSubmit={this.placeOrderHandler}>
                {elementsList}
                <Button 
                    type="Success" 
                    disabled={!this.state.isFormValid}>
                    ORDER
                </Button>
            </form>
        );

        if (this.props.isLoading) {
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

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        isLoading: state.order.isLoading, 
        token: state.auth.token,
        email: state.auth.email
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrder: (data, token) => dispatch(actions.purchaseBurger(data, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(ContactData, axios));