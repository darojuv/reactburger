import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
//import * as actionTypes from '../../store/actions/index';
import { Route } from 'react-router';

class Checkout extends Component{

    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    checkoutContinuedHandler = () => {
        this.props.history.goBack();
    }
    checkoutCancelledHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/" />
        ////console.log(this.props.ings);
        if(this.props.ings){
            ////console.log(this.props.isPurchased);
            const purchasedRedirect = this.props.isPurchased ? <Redirect to="/" /> : null
            summary =  (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                    path={this.props.match.path + '/contact-data' } 
                    component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = (state) => {
    return{
        ings: state.burgerBuilder.ingredients,
        isPurchased: state.order.purchased
    }
};
// const mapDispatchToMap = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actionTypes.purchaseInit())
//     }
// }
export default connect(mapStateToProps)(Checkout);