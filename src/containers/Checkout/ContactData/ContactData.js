import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends Component{
    state = {
        email: '',
        name:'',
        phone:'',
        address:{
            street:'',
            postalCode:''
        },
        totolPrice:0
    }
    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);

        this.setState({loading: true});
        //alert('You continued !');
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                    name: 'Max Venu',
                    address: {street: 'Test Street 1',
                    zipCode: '23413',
                    country: 'India'
                },
                email: 'asdf@asdf.com',
            },
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
    render(){
        let form = (<form>
            <h2>Enter your contact data</h2>
            <input type="text" placeholder="Enter name" />
            <input type="email" placeholder="Enter mail" />
            <input type="text" placeholder="Enter street" />
            <input type="text" placeholder="Enter postal code" />
            {/* <Button btnType="Danger" > CANCEL </Button> */}
            <Button btnType="Success" clicked={this.orderHandler} > ORDER </Button>
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