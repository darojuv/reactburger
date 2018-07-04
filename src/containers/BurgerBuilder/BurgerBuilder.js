import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
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
      purchasing: false,
      loading: false,
      error:false
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
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        console.log(this.props);
        // this.setState({loading: true});
        // //alert('You continued !');
        // const order = {
        //     ingradients: this.state.ingredients,
        //     price: this.state.totolPrice,
        //     customer: {
        //             name: 'Max Venu',
        //             address: {street: 'Test Street 1',
        //             zipCode: '23413',
        //             country: 'India'
        //         },
        //         email: 'asdf@asdf.com',
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        // .then(response =>  {
        //     //console.log(response);
        //     this.setState({loading: false, purchasing: false});
        // })
        // .catch(error => {
        //     //console.log('error: ' + error);
        //     this.setState({loading: false, purchasing: false});            
        // });
        // // this.props.history.push('/checkout?salad=' + this.state.ingredients.salad 
        // //                         + '&bacon=' + this.state.ingredients.bacon
        // //                         + '&cheese=' + this.state.ingredients.cheese
        // //                         + '&meat=' + this.state.ingredients.meat);
        
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search: '?' + queryString
        // });        

        this.props.history.push('/checkout'); 
    }
    componentDidMount(){
        axios.get('https://react-my-burger-772be.firebaseio.com/Ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        })
        .catch(error => {
            this.setState({error: true});
        });
    }
    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;

        let letBurger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />
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
        ings: state.ingredients,
        ttlPrice: state.totalPrice,
        //isPurchasable: state.purchasable,
        //isPurchasing: state.purchasing
    }
};
const mapDispatchToProps = (dispatch) =>{
    return{
        addIngredient: (ingredientType) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientType}),
        deleteIngredient: (ingredientType) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientType})
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
