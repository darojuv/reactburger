import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actionTypes from '../../store/actions/index';

class Auth extends Component {
    state = {
        isSignUp: true,
        controls:{
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                rules:{
                    required: true,
                    isEmail: true
                },
                isValid: false,
                isTouched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                rules:{
                    required: true,
                    minLength: 6
                },
                isValid: false,
                isTouched: false
            }            
        }
    };
    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return { isSignUp : !prevState.isSignUp }
        });
    };
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    };
    inputChangeHandler(event, controlName){
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.checkValidity(event.target.value, this.state.controls[controlName].rules),
                isTouched: true
            }
        };
        this.setState({controls: updatedControls}); 
    };
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, 
                        this.state.controls.password.value, 
                        this.state.isSignUp);
    };
    render(){
        const formElement = [];
        for(let key in this.state.controls){
            formElement.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let authError = null;
        if(this.props.err){
            authError = this.props.err.message
        }
        let form = (
        <form onSubmit={this.submitHandler}>
            {authError}
            {
                formElement.map(element => (
                <Input key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        changed={(event) => this.inputChangeHandler(event, element.id) }
                        elementValid={!element.config.isValid}
                        shouldValidat={element.config.rules}
                        touched={element.config.isTouched}
                        valueType={element.id}
                        />
                ))
            }

            <Button btnType="Success"  > 
                SUBMIT 
            </Button>
        </form>);

        return(
            <div className={classes.Auth}>
                { this.props.loading ? <Spinner /> : form }
                <Button btnType="Danger" clicked={this.switchAuthModeHandler} >
                    SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SINGUP'} 
                </Button>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        err: state.auth.error 
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, bIsSignUp) => dispatch(actionTypes.auth(email, password, bIsSignUp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);