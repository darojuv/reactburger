import * as actionTypes from '../actions/actionTypes';
import updatedObject from '../utility';

const initStateOder = {
        orders: [],
        loading:false,
        purchased: false
};
const purchaseInit = (state) => {
    return updatedObject(state, {purchased: false});
};
const purchaseBurgerStart = (state) => {
    return updatedObject(state, {loading:true, purchased: false});
};
const purchaseBurgerSuccess = (state) => {
    return updatedObject(
        state,
        {loading: false,
        orders: [],
        purchased: true}
    );
};
const purchaseBurgerFail = (state) => {
    return updatedObject(
        state,
        {loading: false}
    );
};
const fetchOrderStart = (state) => {
    return updatedObject(
        state,
        {loading:true}
    );
};
const fetchOrderSuccess = (state, action) => {
    console.log(action);
    return updatedObject(
        state,
        {loading: false,
        orders: action.orders}
    );
};
const fetchOrderFail = (state) => {
    return updatedObject(
        state,
        {loading: false}
    );
}
export const order = (state = initStateOder, action) =>{
    switch(action.type){
        case (actionTypes.PURCAHSE_INIT):
            return purchaseInit(state);
        case (actionTypes.PURCHASE_BURGER_START):
            return purchaseBurgerStart(state);
        case (actionTypes.PURCHASE_BURGER_SUCCESS): 
            return purchaseBurgerSuccess(state);
        case (actionTypes.PURCHASE_BURGER_FAIL):
            return purchaseBurgerFail(state)
        case (actionTypes.FETCH_ORDER_START):
            return fetchOrderStart(state);
        case (actionTypes.FETCH_ORDER_SUCCESS):
            return fetchOrderSuccess(state, action);
        case (actionTypes.FETCH_ORDER_FAIL):
            return fetchOrderFail(state);
        default:
            return state
    }
} 

export default order;