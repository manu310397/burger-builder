import React from 'react';

import classes from './Order.css';

const Order = (props) => {
    const ingredients = [];

    for(let ingredientName in props.ingredients){
        ingredients.push({name:ingredientName, amount: props.ingredients[ingredientName]});
    }

    const ingredientOutput = ingredients.map(ingredient => {
        return <span 
            key={ingredient.name}
            style={{
                textTransform: 'capitalize',
                margin: '0 8px',
                padding: '5px',
                border: '1px solid #ccc',
                display: 'inline-block'
            }}>{ingredient.name} ({ingredient.amount})</span>
    })
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: Rs <strong>{props.price} </strong></p>
        </div>
    )
    
};

export default Order;