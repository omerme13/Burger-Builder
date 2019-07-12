import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import classes from './Auth.css';
import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Message from '../../components/UI/Message/Message';
import * as actions from '../../store/actions/index';
import checkValidity from '../../shared/checkValidity';

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
        isRegister: true,
        submitted: false
    }

    inputChangeHandler = (e, inputId) => {
        // This is a method to change nested state. The usual way won't work
        const updatedForm = {...this.state.authForm};
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
            authForm: updatedForm,
            isFormValid: isFormValid
        });
    }

    submitHandler = (e) => {
        const {email, password} = this.state.authForm;

        e.preventDefault();
        this.setState({submitted: true})
        this.props.onAuth(email.value, password.value, this.state.isRegister);
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
                        {this.state.isRegister ? 'REGISTER' : 'LOGIN'}
                    </Button>
                </form>
                <Button 
                    type="Danger"
                    clicked={this.authModeChangeHandler}>
                    SWITCH TO {this.state.isRegister ? 'LOGIN' : 'REGISTER'}
                </Button>
            </>
        );

        if (this.props.isLoading) {
            form  = <Spinner />
        } 

        let errorMessage = null;
        let successMessage = null;

        if (this.props.error) {
            let errorContent = null;
            const errorString = this.props.error.message;
            const errorCode = errorString.split(' ')[5];

            if (errorCode === '409') {
                errorContent = 'This user already exists in the system';
            } else if (errorCode === '400') {
                errorContent = 'Invalid email or/and password';
            } else {
                errorContent = 'Sorry we had a problem with the server';
            }

            errorMessage = <Message type="Error">{errorContent}</Message>
        }

        if(!this.props.error && this.state.isRegister && this.state.submitted) {
            successMessage = (
                <Message type="Success">
                    You have registered successfully!
                </Message>
            );
        }

        let authRedirect = null;
        console.log(this.props.isBuilding, 'building')

        if (this.props.isAuthenticated) {
            if (this.props.isBuilding) {
                authRedirect = <Redirect to="/checkout" />
            } else {
                authRedirect = <Redirect to="/" />
            }
        }

        return (
            <div className={classes.Auth}>       
                {successMessage}         
                {errorMessage}
                {form}
                {authRedirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading,
        error: state.auth.error,
        isAuthenticated: state.auth.token,
        isBuilding: state.burgerBuilder.isBuilding
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isRegister) => dispatch(actions.auth(email, password, isRegister))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);