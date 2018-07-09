import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
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
        },
        isSignup: true
    }

    componentDidMount(){
        if(!this.props.isBuldingBurger && this.props.authRedirectPath !== '/'){
            //console.log('Container/Auth.js-->componentDidMount', this.props);
            //this.props.onSetAuthRedirectPath();
        }
    }

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
    }

    inputChangeHandler = (event, controlName) => {
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
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, 
                            this.state.controls.password.value, 
                            this.state.isSignup);
    }
    
    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return { isSignup : !prevState.isSignup }
        });
    }
    
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
        let redirectAfterAuth = null;
        if(this.props.isAuthenticated){
            console.log(this.props.authRedirectPath);
            redirectAfterAuth = <Redirect to={this.props.authRedirectPath} />
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
             {redirectAfterAuth}
                { this.props.loading ? <Spinner /> : form }
                <Button btnType="Danger" clicked={this.switchAuthModeHandler} >
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SINGUP'} 
                </Button>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticated: state.auth.idToken != null,
        err: state.auth.error,
        isBuldingBurger : state.burgerBuilder.bulding,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, bisSignup) => dispatch(actions.auth(email, password, bisSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);