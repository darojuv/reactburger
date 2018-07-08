import React, {Component} from 'react';
import {connect} from 'react-redux';
//import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
    //   ingredients: null,
    //   totalPrice: 4,
      //: false,
      purchasing: false
      /* ,
      loading: false,
      error:false */
    };
    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
                return sum + el
        }, 0);
        //Object.keys(ingredients)//this will give arrray of keys i.e., [salad,bacon,cheese,meat]
        return sum > 0;
        
    };
    addIngredientHandler = (type) =>{
        // const oldCount = this.state.ingredients[type];
        // const updatedCount = oldCount + 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice + priceAddition;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        // this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) =>{
        // const oldCount = this.state.ingredients[type];
        // if(oldCount <= 0){
        //     return;
        // }
        // const updatedCount = oldCount - 1;
        // const updatedIngredients = {
        //     ...this.state.ingredients
        // };
        // updatedIngredients[type] = updatedCount;
        // const priceDeduction = INGREDIENT_PRICES[type];
        // const oldPrice = this.state.totalPrice;
        // const newPrice = oldPrice - priceDeduction;
        // this.setState({totalPrice: newPrice, ingredients: updatedIngredients});   
        // this.updatePurchaseState(updatedIngredients);   
    }
    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            //<Redirect to="/auth" />
            this.props.history.push("/auth");
        }
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout'); 
    }
    componentDidMount(){
        this.props.onInitIngredients();
    }
    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let letBurger = this.props.err ? <p>Ingredients can not be loaded</p> : <Spinner />
        if(this.props.ings !== null){
            letBurger = (<Aux>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.addIngredient} 
                    ingredientRemoved ={this.props.deleteIngredient}
                    disabled={disableInfo}
                    totalPrice={this.props.ttlPrice}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                />
                </Aux>);

                orderSummary =  <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
                price = {this.props.ttlPrice}
                />;
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal>
                { letBurger }
            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        ings: state.burgerBuilder.ingredients,
        ttlPrice: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.idToken != null
        //isPurchasable: state.purchasable,
        //isPurchasing: state.purchasing
    }
};
const mapDispatchToProps = (dispatch) =>{
    return{
        addIngredient: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
        deleteIngredient: (ingredientType) => dispatch(actions.removeIngredient(ingredientType)),
        onInitIngredients: () => dispatch(actions.initInigredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
