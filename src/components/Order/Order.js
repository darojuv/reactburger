import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];
    //console.log(props.ingredients);
    for(let ingrendientName in props.ingredients ){
        ingredients.push({
            name:ingrendientName, 
            amount: props.ingredients[ingrendientName] });
    }

    return (
        <div className={classes.Order}>
        Ingradients: 
        {ingredients.map(
            ig => (
                <span className={classes.igSpan} key={ig.name}> {ig.name} ({ig.amount}) </span>
            )
        )}
       <p> Price:  <strong>USD {  Number.parseFloat(props.price).toFixed(2)}</strong> 
        </p>
        </div>
    );
}

export default Order;