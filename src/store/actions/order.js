import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const burgerPurchaceSuccess = (id, orderData) => {
    
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    }
}
const burgerPurchaceFail = (error) => {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,

    }
}
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post('/orders.json', orderData)
        .then(response =>  {
            dispatch(burgerPurchaceSuccess(response.data.name, orderData));
        })
        .catch(error => {
            console.log(error);
            dispatch(burgerPurchaceFail(error));            
        });
    }
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCAHSE_INIT 
    }
}

export const fetchOrderSuccess = (fetchedOrders) => {        console.log('fetchedOrders');

    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: fetchedOrders
    }
}

export const fetchOrderStart = () => {
    return{
        type: actionTypes.FETCH_ORDER_START
    }
}
export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}
export const fetchOrders = () => {    
    return dispatch => {
        dispatch(fetchOrderStart());
        console.log('asdf');
        axios.get('/orders.json')
        .then((dt) => {
            const fetchedOrders = [];
            for(let key in dt.data){
                fetchedOrders.push({
                    id: key,
                    ...dt.data[key]
                });
            }
            
            dispatch(fetchOrderSuccess(fetchedOrders));
            //this.setState({loading: false, orders: fetchOrders});
        })
        .catch((error) => {
            //this.setState({loading: false});
            console.log(error);
            dispatch(fetchOrderFail(error));
        });
    }
}