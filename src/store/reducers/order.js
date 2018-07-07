import * as actionTypes from '../actions/actionTypes';

const initStateOder = {
        orders: [],
        loading:false,
        purchased: false
};

export const order = (state = initStateOder, action) =>{
    switch(action.type){
        case (actionTypes.PURCAHSE_INIT):
            return{
                ...state,
                purchased: false
            }
        case (actionTypes.PURCHASE_BURGER_START):
           // console.log(state);
            return {
                ...state,
                loading:true,
                purchased: false
            }
        case (actionTypes.PURCHASE_BURGER_SUCCESS): 
            // const newOrderData = {
            //     ...action.orderData,
            //     id: action.id
            // }
            console.log(state);
            return {
                ...state,
                loading: false,
                orders: [],// state.orders.concat(newOrderData),
                purchased: true
            }
        case (actionTypes.PURCHASE_BURGER_FAIL):
            return{
                ...state,
                loading: false
            }
        case (actionTypes.FETCH_ORDER_START):
            return{
                ...state,
                loading:true
            }
        case (actionTypes.FETCH_ORDER_SUCCESS):
        console.log(action);
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        case (actionTypes.FETCH_ORDER_FAIL):
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
} 

export default order;