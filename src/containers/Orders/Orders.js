import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    // componentWillMount(){
    //     // this.setState({loading: true });
    //     // axios.get('/orders.json')
    //     // .then((dt) => {
    //     //     const fetchOrders = [];
    //     //     for(let key in dt.data){
    //     //         fetchOrders.push({
    //     //             id: key,
    //     //             ...dt.data[key]
    //     //         });
    //     //     }
    //     //     this.setState({loading: false, orders: fetchOrders});
    //     // })
    //     // .catch((error) => {
    //     //     this.setState({loading: false});
    //     // });
    //     this.props.onFetchOrders();
    // }
    render (){
        let orders = <Spinner />
        if(!this.props.loading){
            console.log(this.props);
            orders = (this.props.fetchedOrders.map(element => (
                <Order 
                    key={element.id}
                    ingredients={element.ingredients}
                    price={element.price}
                    />
                )));
        }
        return (
            <div>
                {/* {this.state.orders.map(element => ( */}
                {orders}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetchedOrders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, uId) => dispatch(actions.fetchOrders(token, uId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));