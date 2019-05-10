import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

const createInput = (config, value, validation) => {
    return ({   
        kind: 'input',
        config: config,
        value: value,
        validation: validation,
        isValid: false, 
        touched: false
    })
}

const inputs  = {
    email: createInput({type: 'email', placeholder: 'Email'}, '', 
    {
        required : true,
        minLen: 5,
        maxLen: 32
    }),
    password: createInput({type: 'password', placeholder: 'Password'}, '', 
    {
        required : true,
        minLen: 6,
        maxLen: 12
    })
}

class Auth extends Component {
    state = {
        authForm: {
            email: inputs.email,
            password: inputs.password,

        },
        isFormValid: false, 
        isRegister: true
    }

    inputChangeHandler = (e, inputId) => {
        // This is a method to change nested state. The usual way won't work
        const updatedForm = {...this.state.authForm};
        const updatedElement = {...updatedForm[inputId]};

        updatedElement.touched = true;
        updatedElement.value = e.target.value;
        updatedElement.isValid = this.checkValidity(updatedElement.value, updatedElement.validation);
        updatedForm[inputId] = updatedElement;

        let isFormValid = true;

        for (let key in updatedForm) {
            isFormValid = updatedForm[key].isValid && isFormValid;
        }

        this.setState({
            authForm: updatedForm,
            isFormValid: isFormValid
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            // isValid gets true/false depends if the value is empty or not(trim excludes white space)
            isValid = value.trim() !== '';
        }
        if (rules.minLen) {
            isValid = (value.length >= rules.minLen) && isValid;
        }
        if (rules.maxLength) {
            isValid = (value.length <= rules.maxLength) && isValid;
        }

        return isValid;
    }

    submitHandler = (e) => {
        const {email, password} = this.state.authForm;

        e.preventDefault();
        this.props.onAuth(email, password, this.state.isRegister);
    }

    authModeChangeHandler = () => {
        this.setState({isRegister: !this.state.isRegister})
    }

    render() {
        const formElements = [];
        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                data: this.state.authForm[key]
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
            <>
                <form onSubmit={this.submitHandler}>
                    {elementsList}
                    <Button 
                        type="Success" 
                        disabled={!this.state.isFormValid}>
                        {this.state.isRegister ? 'REGISTER' : 'SIGNIN'}
                    </Button>
                </form>
                <Button 
                    type="Danger"
                    clicked={this.authModeChangeHandler}>
                    SWITCH TO {this.state.isRegister ? 'SIGNIN' : 'REGISTER'}
                </Button>
            </>
        );

        return (
            <div className={classes.Auth}>
                {form}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister))
    };
}

export default connect(null, mapDispatchToProps)(Auth);