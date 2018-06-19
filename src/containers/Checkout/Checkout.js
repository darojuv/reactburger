import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state={
        ingredients:{
            salad:0,
            meat:0,
            cheese:0,
            bacon:0
        }
    }
    checkoutContinuedHandler = () => {
        this.props.history.goBack();
    }
    checkoutCancelledHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    // componentDidMount(){
    //     const qs = new URLSearchParams(this.props.location.search);
    //     const ins = {};
    //     for(let q of qs.entries()){
    //         //console.log(q);
    //         ins[q[0]] = q[1];
    //     }
    //     this.setState({ingredients:ins});
    //     console.log(this.state.ingredients);
    // }
    componentDidUpdate(){
        const qs = new URLSearchParams(this.props.location.search);
        const ins = {};
        for(let q of qs.entries()){
            //console.log(q);
            ins[q[0]] = q[1];
        }
        this.setState({ingredients:ins});
        console.log(this.state.ingredients);
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
            </div>
        );
    }
}

export default Checkout;