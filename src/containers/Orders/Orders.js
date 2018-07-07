import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
/*     state={
        orders:[],
        loading: false
    } */
    componentDidMount(){
        this.props.onFetchOrders();
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
        loading: state.order.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));