import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredients = props.ingredients;
    const ingredientsSummary = Object.keys(ingredients)
                .map(igKey => {
                    return <li key={igKey}>
                                <span style={{textTransform: 'capitalize'}}>{igKey}:</span> {ingredients[igKey]}
                            </li>
                })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Burger contains follwoing Ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: Rs {props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;