import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);

    // }
    state = {
      ingredients: {
          salad: 3,
          bacon: 0,
          cheese: 1,
          meat:1
      }  
    };
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                </Aux>
        );
    }
}
export default BurgerBuilder;