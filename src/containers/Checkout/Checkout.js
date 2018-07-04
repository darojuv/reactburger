import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

import { Route } from 'react-router';

class Checkout extends Component{
    // state={
    //     ingredients:{},
    //     totalPrice: 0
    // }
    checkoutContinuedHandler = () => {
        this.props.history.goBack();
    }
    checkoutCancelledHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    // //componentDidMount(){
    // componentWillMount(){
    //     const qs = new URLSearchParams(this.props.location.search);
    //     const ins = {};
    //     let price = 0;
    //     for(let q of qs.entries()){
    //         //console.log(q);
    //         if(q[0] === 'price'){
    //             price = q[1];
    //         }else{
    //             ins[q[0]] = +q[1];
    //         }
    //     }
    //     this.setState({ingredients:ins, totalPrice: price});
    //     //console.log(this.state);
    // }

    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                path={this.props.match.path + '/contact-data' } 
                render={() => (<ContactData />)} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        ings: state.ingredients,
        ttlPrice: state.totalPrice,
        //isPurchasable: state.purchasable,
        //isPurchasing: state.purchasing
    }
};
export default connect(mapStateToProps)(Checkout);