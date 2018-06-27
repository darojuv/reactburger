import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        formValid: false,
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                rules:{
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            address:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street'
                },
                value: '',
                rules:{
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            zipCode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                rules:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                isValid: false,
                isTouched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country '
                },
                value: '',
                rules:{
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                value: '',
                rules:{
                    required: true
                },
                isValid: false,
                isTouched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue:'fastest' },
                        {value:'cheaptest', displayValue:'cheaptest' }
                    ]
                },
                value: '',
                rules:{},
                isValid: true
            }
        }
    }
    checkValidity(rule, value){
        let isValid = true;
        if(rule){
            if(rule.required){
                isValid = value.trim() !== '' && isValid;
            }
            if(rule.minLength){
                isValid = value.length >= rule.minLength && isValid;
            }
            if(rule.maxLength){
                isValid = value.length <= rule.maxLength && isValid;
            }        
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let dataKey in this.state.orderForm){
            formData[dataKey] = this.state.orderForm[dataKey].value;
        }
        this.setState({loading: true});
        //alert('You continued !');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            deliveryMethod: 'fastest'
        };
        console.log('order:' + order);
        axios.post('/orders.json', order)
        .then(response =>  {
            //console.log(response);
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            //console.log('error: ' + error);
            this.setState({loading: false});            
        });
    }
    changeHandler(event, key){
        //console.log(event.target.value);
        const tempForm = {...this.state.orderForm};
        const innerData = {...tempForm[key]};
        innerData.value = event.target.value;
        innerData.isValid = this.checkValidity(innerData.rules, event.target.value)
        innerData.isTouched = true;
        tempForm[key] = innerData;
        let isFormValid = true;
        for(let ele in tempForm){
            isFormValid = isFormValid && tempForm[ele].isValid;
        }
        this.setState({orderForm: tempForm, formValid: isFormValid});
    }
    render(){
        const formElement = [];
        for(let key in this.state.orderForm){
            formElement.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (<form>
            <h2>Enter your contact data</h2>
            {formElement.map(element => (
                <Input key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        changed={(event) => this.changeHandler(event, element.id)}
                        elementValid={!element.config.isValid}
                        shouldValidat={element.config.rules}
                        touched={element.config.isTouched}
                        valueType={element.id}
                        />
            ))}

            {/* <Button btnType="Danger" > CANCEL </Button> */}
            <Button disabled={!this.state.formValid} btnType="Success" clicked={this.orderHandler} > ORDER </Button>
        </form>);
        if(this.state.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

export default ContactData;