import React, {Component} from 'react';
import {connect} from 'react-redux'; 

import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 

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

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            //<Redirect to="/auth" />
            //console.log('container/burgerbuilder/BurgerBuilder.js-->purchaseHandler, else part', this.props);
            this.props.onSetAuthRedirectPath("/checkout");
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
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
