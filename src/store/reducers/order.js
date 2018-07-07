import * as actionTypes from '../actions/actionTypes';
import updatedObject from '../utility';

const initStateOder = {
        orders: [],
        loading:false,
        purchased: false
};

export const order = (state = initStateOder, action) =>{
    switch(action.type){
        case (actionTypes.PURCAHSE_INIT):
            return updatedObject(state, {purchased: false});
        // return{
            //     ...state,
            //     purchased: false
            // }
        case (actionTypes.PURCHASE_BURGER_START):
           // console.log(state);
            return updatedObject(state, {loading:true,
                                        purchased: false});
           // return {
            //     ...state,
            //     loading:true,
            //     purchased: false
            // }
        case (actionTypes.PURCHASE_BURGER_SUCCESS): 
            // const newOrderData = {
            //     ...action.orderData,
            //     id: action.id
            // }
            //console.log(state);
            return updatedObject(
                state,
                {loading: false,
                orders: [],
                purchased: true}
            )
            // return {
            //     ...state,
            //     loading: false,
            //     orders: [],// state.orders.concat(newOrderData),
            //     purchased: true
            // }
        case (actionTypes.PURCHASE_BURGER_FAIL):
            return updatedObject(
                state,
                {loading: false}
            )
        // return{
        //         ...state,
        //         loading: false
        //     }
        case (actionTypes.FETCH_ORDER_START):
            return updatedObject(
                state,
                {loading:true}
            )
        // return{
            //     ...state,
            //     loading:true
            // }
        case (actionTypes.FETCH_ORDER_SUCCESS):
        console.log(action);
        return updatedObject(
            state,
            {loading: false,
            orders: action.orders}
        )
        // return {
            //     ...state,
            //     loading: false,
            //     orders: action.orders
            // }
        case (actionTypes.FETCH_ORDER_FAIL):
        return updatedObject(
            state,
            {loading: false}
        )
        // return {
            //     ...state,
            //     loading: false
            // }
        default:
            return state
    }
} 

export default order;