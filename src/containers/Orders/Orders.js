import React, { Component } from 'react';
import Order from '../../components/Order/Order';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state={
        orders:[],
        loading: false
    }
    componentDidMount(){
        this.setState({loading: true });
        axios.get('/orders.json')
        .then((dt) => {
            const fetchOrders = [];
            for(let key in dt.data){
                fetchOrders.push({
                    id: key,
                    ...dt.data[key]
                });
            }
            console.log(fetchOrders);
            this.setState({loading: false, orders: fetchOrders});
        })
        .catch((error) => {
            console.log(error);
            this.setState({loading: false});
        });
        
    }
    render (){
        return (
            <div>
                {this.state.orders.map(element => (
                    <Order 
                    key={element.id}
                    ingredients={element.ingredients}
                    price={element.price}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);