import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { connect } from 'react-redux';

const controls =[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls} >
    <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
        {
            controls.map(ctrl => (
                    <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label} 
                    removed={() => props.ingredientRemoved(ctrl.type)}
                    added={() => props.ingredientAdded(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                    />
            ))
        }
        <button 
        disabled={!props.purchasable} 
        className={classes.OrderButton}
        onClick={props.ordered}
        > 
        {
            props.isAuthenticated ? 'ORDER NOW' :'SIGNUP TO CONTINUE'
        }
        </button>
    </div>
);
const mapStateToProps = state =>{
    return  {
        isAuthenticated: state.auth.idToken != null
    }
}
export default connect(mapStateToProps)(buildControls);